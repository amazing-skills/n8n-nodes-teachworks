import { INodeProperties } from 'n8n-workflow'
import {
  stringOption,
  enumOption,
  numberOption,
  enumItem,
  booleanOption,
} from './TeachworksContants'

export const TeachworksCustomerOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['customers'],
      },
    },

    options: [
      {
        name: 'Get by ID',
        value: 'getById',
        description: 'Get a customer by ID',
        action: 'Get a customer by ID',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search for a customer',
        action: 'Search for a customer',
        routing: {
          request: {
            method: 'GET',
            url: '/customers',
          },
        },
      },
      {
        name: 'Create a Family',
        value: 'createFamily',
        action: 'Create a family',
        routing: {
          request: {
            method: 'POST',
            url: '/customers/family',
          },
        },
      },
    ],

    default: 'getById',
  },
]

export const TeachworksCustomerFields: INodeProperties[] = [
  {
    displayName: 'Customer ID',
    name: 'id',
    type: 'string',
    default: '',
    placeholder: 'Customer ID',
    displayOptions: {
      show: {
        resource: ['customers'],
        operation: ['getById'],
      },
    },
    routing: {
      request: {
        method: 'GET',
        url: '=/customers/{{ $value }}',
      },
    },
  },
  {
    displayName: 'Search Options',
    name: 'searchOptions',
    type: 'collection',
    default: {},
    placeholder: 'Add Option',
    displayOptions: {
      show: {
        operation: ['search'],
        resource: ['customers'],
      },
    },
    options: [
      stringOption('First Name', 'first_name'),
      stringOption('Last Name', 'last_name'),
      stringOption('Email', 'email'),
      stringOption('Phone Number', 'phone_number'),
      stringOption('City', 'city'),
      stringOption('State', 'state'),
      stringOption('Country', 'country'),
      stringOption('Zip Code', 'zip'),

      enumOption('Customer type', 'type', [
        { name: 'Family', value: 'family' },
        { name: 'Independent', value: 'independent' },
      ]),
      enumOption('Status', 'status', [
        { name: 'Active', value: 'active' },
        { name: 'Inactive', value: 'inactive' },
      ]),
      enumOption('Direction', 'direction', [
        { name: 'Ascending', value: 'asc' },
        { name: 'Descending', value: 'desc' },
      ]),

      numberOption('Page', 'page'),
      numberOption('Per Page', 'per_page'),
    ],
  },
  {
    displayName: 'First Name',
    name: 'first_name',
    type: 'string',
    default: '',
    placeholder: 'First Name',
    required: true,
    displayOptions: {
      show: {
        operation: ['createFamily', 'createFamilyStudent'],
        resource: ['customers'],
      },
    },
    routing: {
      request: {
        body: {
          first_name: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Last Name',
    name: 'last_name',
    type: 'string',
    default: '',
    placeholder: 'Last Name',
    required: true,
    displayOptions: {
      show: {
        operation: ['createFamily', 'createFamilyStudent'],
        resource: ['customers'],
      },
    },
    routing: {
      request: {
        body: {
          last_name: '={{$value}}',
        },
      },
    },
  },
  {
    displayName: 'Create Family Options',
    name: 'createFamilyOptions',
    type: 'collection',
    default: {},
    placeholder: 'Add Option',
    displayOptions: {
      show: {
        operation: ['createFamily'],
        resource: ['customers'],
      },
    },
    options: [
      enumOption(
        'Salutation',
        'salutation',
        [
          { name: 'Mr.', value: 'Mr.' },
          { name: 'Mrs.', value: 'Mrs.' },
          { name: 'Ms.', value: 'Ms.' },
          { name: 'Miss', value: 'Miss' },
          { name: 'Mr. & Mrs.', value: 'Mr. & Mrs.' },
          { name: 'Dr.', value: 'Dr.' },
        ],
        'body',
      ),

      stringOption('Email', 'email', 'body'),
      stringOption('Additional Email', 'additional_email', 'body'),

      stringOption('Home Phone', 'home_phone', 'body'),
      stringOption('Work Phone', 'work_phone', 'body'),
      stringOption('Mobile Phone', 'mobile_phone', 'body'),

      stringOption('Address', 'address', 'body'),
      stringOption('Address 2', 'address_2', 'body'),
      stringOption('City', 'city', 'body'),
      stringOption('State', 'state', 'body'),
      stringOption('Country', 'country', 'body'),
      stringOption('Zip Code', 'zip', 'body'),

      stringOption('Additional Notes', 'additional_notes', 'body'),
      enumOption(
        'Status',
        'status',
        [enumItem('Active'), enumItem('Inactive'), enumItem('Prospective')],
        'body',
      ),

      booleanOption('Email Lesson Reminders', 'email_lesson_reminders', 'body'),
      booleanOption('Email Lesson Notes', 'email_lesson_notes', 'body'),
      booleanOption('SMS Lesson Reminders', 'sms_lesson_reminders', 'body'),

      stringOption('Stripe ID', 'stripe_id', 'body'),
      booleanOption('Unviewed', 'unviewed', 'body'),
    ],
  },
]
