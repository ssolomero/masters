import clientPromise from './db';
import * as mongoDB from "mongodb";

let client;
let db: mongoDB.Db;
let rankings: mongoDB.Collection;
let teams: mongoDB.Collection; 

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    rankings = db.collection('rankings');
    teams = db.collection('teams');
  } catch (error) {
    throw new Error('Failed to connect to db');
  }
}

export async function getRankings() {
  try {
    if (!rankings) await init();
    const result = await rankings.find({}).limit(20).toArray();
    return {rankings: result}
  } catch (error) {
    return { error: 'Failed to fetch rankings'}
  }
}

export async function getTeams() {
  try {
    if (!teams) await init();
    const result = await teams.find({}).limit(20).toArray();
    return {teams: result}
  } catch (error) {
    return { error: 'Failed to fetch rankings'}
  }
}