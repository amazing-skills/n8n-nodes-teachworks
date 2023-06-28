import type {
  IAuthenticate,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow'

export class TeachworksApi implements ICredentialType {
  name = 'teachworksApi'
  displayName = 'Teachworks API'

  documentationUrl =
    'https://documenter.getpostman.com/view/10096149/SWTABydD#7e91c772-f3ba-449a-a27c-e68245c7e94b'
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
    },
  ]

  authenticate: IAuthenticate = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Token token={{$credentials.apiKey}}',
      },
    },
  }
}
