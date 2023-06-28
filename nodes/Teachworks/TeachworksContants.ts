import type { DeclarativeRestApiSettings, INodeProperties } from 'n8n-workflow'

export const BASE_URL = 'https://api.teachworks.com/v1'

export const numberOption = (
  displayName: string,
  name: string,
  body: keyof DeclarativeRestApiSettings.HttpRequestOptions = 'qs',
): INodeProperties => ({
  displayName,
  name,
  type: 'number',
  default: 0,
  routing: {
    request: {
      [body]: {
        [name]: '={{$node["parameters"]["' + name + '"]}}',
      },
    },
  },
})

export const stringOption = (
  displayName: string,
  name: string,
  body: keyof DeclarativeRestApiSettings.HttpRequestOptions = 'qs',
): INodeProperties => ({
  displayName,
  name,
  type: 'string',
  default: '',
  routing: {
    request: {
      [body]: {
        [name]: '={{$value}}',
      },
    },
  },
})

export const enumOption = (
  displayName: string,
  name: string,
  options: { name: string; value: string }[],
  body: keyof DeclarativeRestApiSettings.HttpRequestOptions = 'qs',
  // eslint-disable-next-line n8n-nodes-base/node-param-default-missing
): INodeProperties => ({
  displayName,
  name,
  type: 'options',
  options,
  default: options[0].value,
  routing: {
    request: {
      [body]: {
        [name]: '={{$value}}',
      },
    },
  },
})

export const enumItem = (value: string) => ({ name: value, value })

export const booleanOption = (
  displayName: string,
  name: string,
  body: keyof DeclarativeRestApiSettings.HttpRequestOptions = 'qs',
): INodeProperties => ({
  displayName,
  name,
  type: 'boolean',
  default: false,
  routing: {
    request: {
      [body]: {
        [name]: '={{$value}}',
      },
    },
  },
})
