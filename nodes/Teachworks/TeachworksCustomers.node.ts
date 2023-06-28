import type { INodeType, INodeTypeDescription } from 'n8n-workflow'
import { BASE_URL } from './TeachworksContants'
import {
  TeachworksCustomerFields,
  TeachworksCustomerOperations,
} from './TeachworksCustomers'
import {
  TeachworksStudentsFields,
  TeachworksStudentsOperations,
} from './TeachworksStudents'

export class TeachworksCustomers implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Teachworks',
    name: 'teachworksCustomers',
    // I cannot find an svg icon for teachworks.
    // eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
    icon: 'file:teachworks.png',
    group: ['transform'],
    version: 1,

    subtitle: '={{$parameter["operation"]',
    description: 'Student and Customer operations in Teachworks',
    defaults: {
      name: 'Teachworks Customers',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'teachworksApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },

    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        default: 'customers',

        options: [
          {
            name: 'Customer',
            value: 'customers',
          },
          {
            name: 'Student',
            value: 'students',
          },
        ],
      },
      ...TeachworksCustomerOperations,
      ...TeachworksCustomerFields,
      ...TeachworksStudentsOperations,
      ...TeachworksStudentsFields,
    ],
  }
}
