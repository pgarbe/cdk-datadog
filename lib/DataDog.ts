export enum DataDogSite {
  EU = "datadoghq.eu",
  US = "datadoghq.com"
}

export interface DataDogCredentials {
  readonly datadogApiKey?: string;
  readonly datadogAppKey?: string;
  readonly datadogSite?: DataDogSite;
}