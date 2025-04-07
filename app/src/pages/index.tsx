import Head from "next/head";
import Image from "next/image";
import logo from "../../public/Bulge.svg";
import loadingLogo from "../../public/Bulge.gif"
import { useEffect, useState } from "react";
import RANKINGS from "./api/rankings";
import Accordion from "react-bootstrap/Accordion";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import SELECTIONS from "./api/selections";
import Link from "next/link";


export default function Home() {

  const [loading, setLoading] = useState(true);
  const [playerMap, setPlayerMap] = useState<any>();

  useEffect(() => {
    const url = 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/651';
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': '244f220674msh41be0771b7485eap152c23jsnad1ac3e6b553',
		    'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com'
	    }
    };
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        // setData(json);
        // setLeaderboard(json.results.leaderboard);
        setPlayerMap(createMap(json.results.leaderboard));
      } catch (e) {
        // setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function createMap(data: any) {
    let map = new Map<string, any>();
    data.forEach((element: any) => {
      map.set(`${element.first_name} ${element.last_name}`, element)
    });
    return map;
  }

  function totalScore(data:any) {
    let score = 0;
    data.forEach((el:any) => {
      let player = playerMap.get(el);
      score += player ? player.total_to_par : 0;
    });
    return score;
  }

  function sortTiers(data: any) {
    return data.sort((a:any,  b:any) => playerMap.get(a).total_to_par - playerMap.get(b).total_to_par);
  }

  function sortPool(data:any) {
    return data.sort((a:any, b:any) => totalScore(a.selections) - totalScore(b.selections))
  }

  useEffect(() => {
    if (playerMap) {
      RANKINGS.T1 = sortTiers(RANKINGS.T1);
      RANKINGS.T2 = sortTiers(RANKINGS.T2);
      RANKINGS.T3 = sortTiers(RANKINGS.T3);
    }
  }, [playerMap]);

  if (loading) return (
    <div className="main">
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
    <>
      <Head>
        <title>The Bulge Open</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pochaevsk&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className="main">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          priority
          className="mt-4"
        />
        <div className="content">
          <div className="mx-auto mt-5">
            <Link href="/registration"
            >
              <button className="default-btn"><strong>Jump In!</strong></button>
            </Link>
          </div>
        </div>
        {/* <Accordion defaultActiveKey="0" className="content">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="total-score">{playerMap.get(sortTiers(RANKINGS.T1)[0]).total_to_par
                + playerMap.get(sortTiers(RANKINGS.T2)[0]).total_to_par
                + playerMap.get(sortTiers(RANKINGS.T3)[0]).total_to_par}
            </div>
            <div>Perfect Team</div>
          </Accordion.Header>
          <Accordion.Body>
          <table className="scoreboard">
            <tr className="perfect-team-header">
            </tr>
            <tr className="player-score">
              <td>T1</td>
              <td>{sortTiers(RANKINGS.T1)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T1)[0]).total_to_par}</td>
            </tr>
            <tr className="player-score">
              <td>T2</td>
              <td>{sortTiers(RANKINGS.T2)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T2)[0]).total_to_par}</td>
            </tr>
            <tr className="player-score">
              <td>T3</td>
              <td>{sortTiers(RANKINGS.T3)[0]}</td>
              <td>{playerMap.get(sortTiers(RANKINGS.T3)[0]).total_to_par}</td>
            </tr>
          </table>
          </Accordion.Body>
        </Accordion.Item>
        {sortPool(SELECTIONS).map((item: any, index: number) => {
            return (
              <Accordion.Item eventKey={index + 1 + ""} key={index}
              >
                <Accordion.Header>
                  <div className="total-score">{totalScore(item.selections)}</div>
                  <div>{item.name}</div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.selections.map((player:any, index: number) => {
                    return (
                      <table className="scoreboard">
                      <tr className="perfect-team-header"></tr>
                      <tr className="player-score">
                        <td>T{index+1}</td>
                        <td>{player}</td>
                        <td>{playerMap.get(player).total_to_par}</td>
                    </tr>
                  </table>
                    );
                  })}
                </Accordion.Body>
              </Accordion.Item>
            );
        })}
        
        </Accordion> */}
      </div>
    </>
  );
}
