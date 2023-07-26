import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Todo, useTodosStore } from './todos-store';

export enum IncidentStatus {
  FINISH = 'finish',
  CONTROLLED = 'controlled',
  EVOLUTION = 'inevolution',
  ARCHIVED = 'archived',
}

export enum IncidentCinetic {
  SLOW = 'slow',
  FAST = 'fast',
}

export interface Room {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  level: string;
  building: string;
  phone_number: string;
}


export interface Incident {
  id:number
  created_at: Date;
  updated_at: Date;
  close_at: Date;
  date: string | Date;
  is_exercice: boolean;
  description: string;
  localisation: string;
  emergency_call: boolean;
  containment: boolean;
  evacuation: boolean;
  victims_death: number;
  victims_ua: number;
  victims_ur: number;
  victims_involved: number;
  impact_on_site: string | null;
  impact_outside: string | null;
  external_communication: string | null;
  observations: string | null;
  poi_open_at: string | Date | null;
  poi_close_at: string | Date | null;
  external_effect: boolean;
  status: IncidentStatus;
  chemical_name: string | null;
  chemical_qty: string | null;
  cinetic: IncidentCinetic | null;
  risk_thermic: boolean | null;
  risk_toxic: boolean | null;
  risk_surpressure: boolean | null;
  risk_environmental: boolean | null;
  facilities_stop: boolean | null;
  facilties_actions: string | null;
  possibleRiskForPopulation: boolean | null
  contactMunicipalty: boolean
  contactNeighbourhood: boolean
  crisis_room: Room;
  crisisRoomId: number;
  todos: Todo[];
}


export const useIncidentStore = defineStore('incident', {
  state: () => ({
    incident: null as Omit<Incident,'todos'> | null
  }),

  actions: {
    async getIncident (id:string) {
      try {
        const resp = await api.get<Incident>(`/incidents/${id}`)
        const incident = {...resp.data}
        const todoStore = useTodosStore()
        todoStore.todos = incident.todos
        Reflect.deleteProperty(incident,'todos')
        this.incident = incident
      } catch (error) {
        console.error(error)
      }
    },
  async updateIncident(){
    try {
      const {crisis_room,...rest} = this.incident
      const resp = await api.patch(`/incidents/${this.incident?.id}`,rest)
      const incident = {...resp.data}
        const todoStore = useTodosStore()
        todoStore.todos = incident.todos
        Reflect.deleteProperty(incident,'todos')
        this.incident = incident
    
    } catch (error) {
      console.log(error)
    }
  }
  }
});
