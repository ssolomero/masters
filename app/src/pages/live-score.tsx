import Image from "next/image";
import loadingLogo from "../../public/Bulge-loading.gif";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Player, Rankings, Teams, TeamsResponse } from "@/typings/types";
import Logo from "@/components/logo";
import Badge from '@mui/material/Badge';
import Box from "@mui/material/Box";
import HelpDialog from "../components/help-dialog";


export default function Home() {

  const scoresUrl = 'https://live-golf-data.p.rapidapi.com/leaderboard?orgId=1&tournId=014&year=2025';
  const scoresOptions = {
	  method: 'GET',
	  headers: {
	    'x-rapidapi-key': '244f220674msh41be0771b7485eap152c23jsnad1ac3e6b553',
	    'x-rapidapi-host': 'live-golf-data.p.rapidapi.com'
	  }
  };

  const [loading, setLoading] = useState(true);
  const [playerMap, setPlayerMap] = useState(new Map());
  const [teams, setTeams] = useState({} as Teams[]);
  const [rankings, setRankings] = useState(null as unknown as Rankings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoresResponse, teamsResponse, rankingsResponse] = 
          await Promise.all([
            fetch(scoresUrl, scoresOptions), 
            fetch('/api/teams'),
            fetch('/api/rankings')
          ]);
        const scoresData = await scoresResponse.json(); // live
        const {data: teamsData} = await teamsResponse.json(); // registered teams data
        const {data: rankingsData} = await rankingsResponse.json(); //pre-rankings data
        setTeams(createTeamsObject(teamsData));
        delete rankingsData[0]._id; // Remove _id if it exists
        setRankings(rankingsData[0]);
        setPlayerMap(createMap(scoresData.leaderboardRows));
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function createMap(data: Player[]) {
    const map = new Map<string, Player>();
    data.forEach((element) => {
      map.set(`${element.firstName} ${element.lastName}`, element)
    });
    return map;
  }

  /** Get top 5 players scores */
  function totalScore(data:{tier: string, name: string}[]) {
    let score = 0;
    for (let i = 0; i < data.length && i < 5; i++) {
      const el = data[i];
      const player = playerMap.get(el.name);
      if (player?.total === 'E') score += 0;
      else score += player ? parseInt(player.total) : 0;
      if (player?.status === 'cut') score += 10;
    }
    return score;
  }
   
  function getBestScore(data: string[]) {
    let score = 0;
    data.forEach((el) => {
      const player = playerMap.get(el);
      if (player?.total === 'E') score += 0;
      else score += player ? parseInt(player.total) : 0;
    });
    return score;
  }

  function sortTiers(data: string[]) {
    return data.sort((a,  b) => normalizeScoreTotal(playerMap.get(a)?.total) - normalizeScoreTotal(playerMap.get(b)?.total));
  }
 
  function sortPool(data: Teams[]) {
    return data.sort((a, b) => totalScore(a.players) - totalScore(b.players))
  }

  function normalizeScoreTotal(total: string) {
    if (total === 'E') return 0;
    else return parseInt(total) ??  0;
  }

  //eslint-disable-next-line
  function getAggregateScore(player: any) {
    if (player?.status === 'cut') return (normalizeScoreTotal(player?.total) + 10);
    return normalizeScoreTotal(player?.total);
  }

  function sortTeamPlayers(teamObject: {tier: string, name: string}[]) {
    return teamObject.sort((a, b) => getAggregateScore(playerMap.get(a.name)) - getAggregateScore(playerMap.get(b.name)));
  }

  function createTeamsObject(teams: TeamsResponse[]) {
    const teamsMap = teams.map((team) => ({
      owner: team.owner,
      players: team.players.map((player: string, idx: number) => ({ tier: `T${idx + 1}`, name: player }))
    }));
    console.log(teamsMap);
    return teamsMap;
  }


  useEffect(() => {
    if (playerMap && rankings) {
      rankings.T1 = sortTiers(rankings.T1);
      rankings.T2 = sortTiers(rankings.T2);
      rankings.T3 = sortTiers(rankings.T3);
      rankings.T4 = sortTiers(rankings.T4);
      rankings.T5 = sortTiers(rankings.T5);
      rankings.T6 = sortTiers(rankings.T6);
      rankings.T7 = sortTiers(rankings.T7);
    }
  }, [playerMap, rankings])

  if (loading) return (
    <div className="main text-center">
      <Image
        src={loadingLogo}
        alt="logo"
        width={200}
        height={200}
        priority
        className="mt-4"
      />
    </div>
  );
  
  return (
    <div className="main">
      {!loading && <Box sx={{ textAlign: "center" }}><Logo /></Box>}
      <HelpDialog />
      <Accordion defaultActiveKey="0" className="content pt-5">
        <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="total-score">{getBestScore([
            sortTiers(rankings.T1)[0],
            sortTiers(rankings.T2)[0],
            sortTiers(rankings.T3)[0],
            sortTiers(rankings.T4)[0],
            sortTiers(rankings.T5)[0],
            sortTiers(rankings.T6)[0],
            sortTiers(rankings.T7)[0]
          ])}
          </div>
          <div>Perfect Team</div>
        </Accordion.Header>
        <Accordion.Body>
        <table className="scoreboard">
          <thead className="perfect-team-header">
          </thead>
          <tbody>
          {Object.entries(rankings).map(([key, value]) => {
            return (
              <tr className="player-score" key={key}>
                <td>{key}</td>
                <td>{sortTiers(value)[0]}</td>
                <td>{playerMap.get(sortTiers(value)[0])?.total ?? 0}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </Accordion.Body>
        </Accordion.Item>
        {sortPool(teams).map((team, index) => {
          return (
            <Accordion.Item eventKey={index + 1 + ""} key={index}
            >
              <Accordion.Header>
                <div className="total-score">{totalScore(sortTeamPlayers(team.players))}</div>
                <div>{team.owner}</div>
              </Accordion.Header>
              <Accordion.Body>
                {sortTeamPlayers(team.players).map((player, index) => {
                  const playerData = playerMap.get(player.name);
                  return (
                    <table className="scoreboard" key={player.name}>
                      <thead className="perfect-team-header"></thead>
                      <tbody>
                        <tr className={index === 5 || index === 6 ? "player-score-eliminated" : "player-score"}>
                          <td className="tier-cell">{player.tier}</td>
                          <td className="name-cell">{player.name}</td>
                          <td className="score-cell">
                            {playerData?.status === 'cut' ?
                              (<Badge 
                                  badgeContent={"+10"}
                                  color="primary"
                                >
                                <Box sx={{padding: 0.5}}>{playerMap.get(player.name)?.total ?? 0}</Box>
                              </Badge>) : (
                              <Box>
                                {playerMap.get(player.name)?.total ?? 0}
                              </Box>
                              )
                            }
                          </td>
                        </tr>
                      </tbody>
                </table>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
}
