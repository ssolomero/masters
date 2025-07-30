export interface Player {
  firstName: string,
  lastName: string,
  total: string
}

export interface Teams {
  owner: string,
  players: string[]
}

export interface Rankings { 
	T1: string[],
	T2: string[],
	T3: string[],
	T4: string[],
	T5: string[],
	T6: string[],
	T7: string[]
}