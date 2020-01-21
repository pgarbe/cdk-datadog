export enum DataDogSite {
  eu = "datadoghq.eu",
  us = "datadoghq.com"
}

export interface DataDogCredentials {
  readonly datadogApiKey?: string;
  readonly datadogAppKey?: string;
  readonly datadogSite?: DataDogSite;
}