export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      children: {
        Row: {
          birthdate: string
          created_at: string
          id: number
          name: string
          user_id: string
        }
        Insert: {
          birthdate: string
          created_at?: string
          id?: number
          name: string
          user_id?: string
        }
        Update: {
          birthdate?: string
          created_at?: string
          id?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      cute_quotes: {
        Row: {
          child_id: number | null
          created_at: string
          date: string
          id: number
          location: string | null
          parent_reaction: string | null
          present_people: string | null
          prior_activity: string | null
          quote_text: string
          quote_trigger: string
          record_type: string
        }
        Insert: {
          child_id?: number | null
          created_at?: string
          date: string
          id?: number
          location?: string | null
          parent_reaction?: string | null
          present_people?: string | null
          prior_activity?: string | null
          quote_text: string
          quote_trigger: string
          record_type?: string
        }
        Update: {
          child_id?: number | null
          created_at?: string
          date?: string
          id?: number
          location?: string | null
          parent_reaction?: string | null
          present_people?: string | null
          prior_activity?: string | null
          quote_text?: string
          quote_trigger?: string
          record_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cute_quotes_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_things: {
        Row: {
          child_id: number
          created_at: string
          favorite_item_name: string
          favorite_memory_with_item: string | null
          how_they_used_it: string | null
          id: number
          love_started_at: string | null
          nickname_or_name: string | null
          notable_events_or_changes: string | null
          reason_for_love: string | null
          record_type: string
          still_have_it: string | null
          where_it_went: string | null
        }
        Insert: {
          child_id: number
          created_at?: string
          favorite_item_name: string
          favorite_memory_with_item?: string | null
          how_they_used_it?: string | null
          id?: number
          love_started_at?: string | null
          nickname_or_name?: string | null
          notable_events_or_changes?: string | null
          reason_for_love?: string | null
          record_type?: string
          still_have_it?: string | null
          where_it_went?: string | null
        }
        Update: {
          child_id?: number
          created_at?: string
          favorite_item_name?: string
          favorite_memory_with_item?: string | null
          how_they_used_it?: string | null
          id?: number
          love_started_at?: string | null
          nickname_or_name?: string | null
          notable_events_or_changes?: string | null
          reason_for_love?: string | null
          record_type?: string
          still_have_it?: string | null
          where_it_went?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorite_things_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          content_type: string | null
          created_at: string
          cute_quotes_id: number | null
          favorite_things_id: number | null
          filename: string | null
          id: number
          media_type: string
          media_url: string
          milestone: number | null
          precious_moments_id: number | null
          pronunciation: number | null
          s3_key: string
          tender_traditions_id: number | null
        }
        Insert: {
          content_type?: string | null
          created_at?: string
          cute_quotes_id?: number | null
          favorite_things_id?: number | null
          filename?: string | null
          id?: number
          media_type: string
          media_url: string
          milestone?: number | null
          precious_moments_id?: number | null
          pronunciation?: number | null
          s3_key: string
          tender_traditions_id?: number | null
        }
        Update: {
          content_type?: string | null
          created_at?: string
          cute_quotes_id?: number | null
          favorite_things_id?: number | null
          filename?: string | null
          id?: number
          media_type?: string
          media_url?: string
          milestone?: number | null
          precious_moments_id?: number | null
          pronunciation?: number | null
          s3_key?: string
          tender_traditions_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_cute_quotes_id_fkey"
            columns: ["cute_quotes_id"]
            isOneToOne: false
            referencedRelation: "cute_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_favorite_things_id_fkey"
            columns: ["favorite_things_id"]
            isOneToOne: false
            referencedRelation: "favorite_things"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_precious_moments_id_fkey"
            columns: ["precious_moments_id"]
            isOneToOne: false
            referencedRelation: "precious_moments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_pronunciation_fkey"
            columns: ["pronunciation"]
            isOneToOne: false
            referencedRelation: "pronunciations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_tender_traditions_id_fkey"
            columns: ["tender_traditions_id"]
            isOneToOne: false
            referencedRelation: "tender_traditions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "videos_milestone_fkey"
            columns: ["milestone"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          alwaysremember: string | null
          child_id: number | null
          childreaction: string | null
          companions: string | null
          created_at: string
          date: string
          environment: string | null
          extras: string | null
          id: number
          milestone: string
          personality: string | null
          record_type: string
          remember: string | null
        }
        Insert: {
          alwaysremember?: string | null
          child_id?: number | null
          childreaction?: string | null
          companions?: string | null
          created_at?: string
          date: string
          environment?: string | null
          extras?: string | null
          id?: number
          milestone: string
          personality?: string | null
          record_type?: string
          remember?: string | null
        }
        Update: {
          alwaysremember?: string | null
          child_id?: number | null
          childreaction?: string | null
          companions?: string | null
          created_at?: string
          date?: string
          environment?: string | null
          extras?: string | null
          id?: number
          milestone?: string
          personality?: string | null
          record_type?: string
          remember?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      precious_moments: {
        Row: {
          child_id: number | null
          child_memory_potential: string | null
          created_at: string
          emotional_effect: string | null
          id: number
          moment_description: string
          moment_location: string | null
          moment_time: string
          people_involved: string | null
          record_type: string
          sensory_details: string | null
          why_it_matters: string | null
        }
        Insert: {
          child_id?: number | null
          child_memory_potential?: string | null
          created_at?: string
          emotional_effect?: string | null
          id?: number
          moment_description: string
          moment_location?: string | null
          moment_time: string
          people_involved?: string | null
          record_type?: string
          sensory_details?: string | null
          why_it_matters?: string | null
        }
        Update: {
          child_id?: number | null
          child_memory_potential?: string | null
          created_at?: string
          emotional_effect?: string | null
          id?: number
          moment_description?: string
          moment_location?: string | null
          moment_time?: string
          people_involved?: string | null
          record_type?: string
          sensory_details?: string | null
          why_it_matters?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "precious_moments_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean
          annual_price: number | null
          created_at: string
          id: string
          product_id: string
          test: boolean
        }
        Insert: {
          active: boolean
          annual_price?: number | null
          created_at?: string
          id: string
          product_id: string
          test: boolean
        }
        Update: {
          active?: boolean
          annual_price?: number | null
          created_at?: string
          id?: string
          product_id?: string
          test?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          cute_quotes_monthly_limit: number | null
          description: string | null
          favorite_things_monthly_limit: number | null
          id: string
          milestones_monthly_limit: number | null
          name: string
          precious_moments_monthly_limit: number | null
          pronunciations_monthly_limit: number | null
          tender_traditions_monthly_limit: number | null
          test: boolean
        }
        Insert: {
          active: boolean
          created_at?: string
          cute_quotes_monthly_limit?: number | null
          description?: string | null
          favorite_things_monthly_limit?: number | null
          id: string
          milestones_monthly_limit?: number | null
          name: string
          precious_moments_monthly_limit?: number | null
          pronunciations_monthly_limit?: number | null
          tender_traditions_monthly_limit?: number | null
          test: boolean
        }
        Update: {
          active?: boolean
          created_at?: string
          cute_quotes_monthly_limit?: number | null
          description?: string | null
          favorite_things_monthly_limit?: number | null
          id?: string
          milestones_monthly_limit?: number | null
          name?: string
          precious_moments_monthly_limit?: number | null
          pronunciations_monthly_limit?: number | null
          tender_traditions_monthly_limit?: number | null
          test?: boolean
        }
        Relationships: []
      }
      pronunciations: {
        Row: {
          child_id: number | null
          created_at: string
          id: number
          image_url: string | null
          pronunciation: string
          record_type: string
          user_id: string
          video_url: string | null
          word: string
        }
        Insert: {
          child_id?: number | null
          created_at?: string
          id?: number
          image_url?: string | null
          pronunciation: string
          record_type?: string
          user_id?: string
          video_url?: string | null
          word: string
        }
        Update: {
          child_id?: number | null
          created_at?: string
          id?: number
          image_url?: string | null
          pronunciation?: string
          record_type?: string
          user_id?: string
          video_url?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "pronunciations_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_rules: {
        Row: {
          created_at: string
          id: number
          media_uploads_allowed: number
          product_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          media_uploads_allowed: number
          product_id: string
        }
        Update: {
          created_at?: string
          id?: number
          media_uploads_allowed?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_rules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_rules_product_id_fkey1"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      tender_traditions: {
        Row: {
          child_id: number | null
          created_at: string
          emotional_effect: string | null
          evolution_of_tradition: string | null
          favorite_memory_of_tradition: string | null
          id: number
          origin_story: string | null
          people_involved: string | null
          record_type: string
          special_details: string | null
          tradition_name: string
          tradition_time: string | null
        }
        Insert: {
          child_id?: number | null
          created_at?: string
          emotional_effect?: string | null
          evolution_of_tradition?: string | null
          favorite_memory_of_tradition?: string | null
          id?: number
          origin_story?: string | null
          people_involved?: string | null
          record_type?: string
          special_details?: string | null
          tradition_name: string
          tradition_time?: string | null
        }
        Update: {
          child_id?: number | null
          created_at?: string
          emotional_effect?: string | null
          evolution_of_tradition?: string | null
          favorite_memory_of_tradition?: string | null
          id?: number
          origin_story?: string | null
          people_involved?: string | null
          record_type?: string
          special_details?: string | null
          tradition_name?: string
          tradition_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tender_traditions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          id: string
          price_id: string | null
          product_id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          trial_plan: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          price_id?: string | null
          product_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_plan?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          price_id?: string | null
          product_id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_plan?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      my_entries_view: {
        Row: {
          created_at: string | null
          table_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_my_entries_with_created_at: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          created_at: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
