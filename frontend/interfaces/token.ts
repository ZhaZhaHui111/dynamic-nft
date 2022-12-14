export interface INFToken {
  //_id: string
  contract_id: string
  token_id: string;
  owner_id: string;
  token_series_id: string

  metadata: {
    title: string;
    description: string;
    media: string;
    media_hash: never;
    copies: number;
    issued_at: string;
    expires_at: never;
    starts_at: never;
    updated_at: never;
    extra: never;
    reference: string;
    reference_hash: never;
  };
  approved_account_ids: never;
}
