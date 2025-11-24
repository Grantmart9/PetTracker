export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      boundaries: {
        Row: {
          boundary_geojson: Json;
          dog_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          boundary_geojson: Json;
          dog_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          boundary_geojson?: Json;
          dog_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "boundaries_dog_id_fkey";
            columns: ["dog_id"];
            isOneToOne: false;
            referencedRelation: "dogs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "boundaries_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      dogs: {
        Row: {
          breed: string | null;
          collar_id: string | null;
          created_at: string;
          id: string;
          name: string;
          photo_url: string | null;
          user_id: string;
        };
        Insert: {
          breed?: string | null;
          collar_id?: string | null;
          created_at?: string;
          id?: string;
          name: string;
          photo_url?: string | null;
          user_id: string;
        };
        Update: {
          breed?: string | null;
          collar_id?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          photo_url?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dogs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      locations: {
        Row: {
          dog_id: string;
          id: string;
          latitude: number;
          longitude: number;
          timestamp: string;
        };
        Insert: {
          dog_id: string;
          id?: string;
          latitude: number;
          longitude: number;
          timestamp?: string;
        };
        Update: {
          dog_id?: string;
          id?: string;
          latitude?: number;
          longitude?: number;
          timestamp?: string;
        };
        Relationships: [
          {
            foreignKeyName: "locations_dog_id_fkey";
            columns: ["dog_id"];
            isOneToOne: false;
            referencedRelation: "dogs";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          dog_id: string;
          id: string;
          message: string;
          seen: boolean | null;
          triggered_at: string;
        };
        Insert: {
          dog_id: string;
          id?: string;
          message: string;
          seen?: boolean | null;
          triggered_at?: string;
        };
        Update: {
          dog_id?: string;
          id?: string;
          message?: string;
          seen?: boolean | null;
          triggered_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_dog_id_fkey";
            columns: ["dog_id"];
            isOneToOne: false;
            referencedRelation: "dogs";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
