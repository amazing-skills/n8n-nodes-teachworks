import type { INodeType, INodeTypeDescription } from 'n8n-workflow'
import {
  BASE_URL,
  booleanOption,
  enumItem,
  enumOption,
  numberOption,
  stringOption,
} from './TeachworksContants'

export class TeachworksCustomers implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Teachworks Customers',
    name: 'teachworksCustomers',
    icon: 'file:teachworks.png',
    group: ['transform'],
    version: 1,

    subtitle: '={{$parameter["operation"]',
    description: 'Fetch or create customer in Teachworks',
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
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,

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
          {
            name: 'Create an Family Child',
            value: 'createFamilyChild',
            action: 'Create a family child',
            routing: {
              request: {
                method: 'POST',
                url: '/students',
              },
            },
          },
        ],

        default: 'getById',
      },
      {
        displayName: 'Customer ID',
        name: 'id',
        type: 'string',
        default: '',
        placeholder: 'Customer ID',
        displayOptions: {
          show: {
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
            operation: ['createFamily', 'createFamilyChild'],
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
            operation: ['createFamily', 'createFamilyChild'],
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

          booleanOption(
            'Email Lesson Reminders',
            'email_lesson_reminders',
            'body',
          ),
          booleanOption('Email Lesson Notes', 'email_lesson_notes', 'body'),
          booleanOption('SMS Lesson Reminders', 'sms_lesson_reminders', 'body'),

          stringOption('Stripe ID', 'stripe_id', 'body'),
          booleanOption('Unviewed', 'unviewed', 'body'),
        ],
      },
      {
        displayName: 'Create Family Child Options',
        name: 'createFamilyChildOptions',
        type: 'collection',
        default: {},
        placeholder: 'Add Option',
        displayOptions: {
          show: {
            operation: ['createFamilyChild'],
          },
        },
        options: [
          stringOption('Family Customer ID', 'customer_id', 'body'),

          stringOption('Email', 'email', 'body'),
          stringOption('Additional Email', 'additional_email', 'body'),

          stringOption('Home Phone', 'home_phone', 'body'),
          stringOption('Work Phone', 'work_phone', 'body'),
          stringOption('Mobile Phone', 'mobile_phone', 'body'),

          stringOption('Additional Notes', 'additional_notes', 'body'),
          enumOption(
            'Status',
            'status',
            [enumItem('Active'), enumItem('Inactive'), enumItem('Prospective')],
            'body',
          ),

          stringOption('School', 'school', 'body'),
          stringOption('Grade', 'grade', 'body'),
          stringOption('Calendar color', 'calendar_color', 'body'),

          stringOption('Birthdate', 'birth_date', 'body'),
          stringOption('Start date', 'start_date', 'body'),

          enumOption(
            'Billing method',
            'billing_method',
            [
              enumItem('Service List Cost'),
              enumItem('Student Cost'),
              enumItem('Package'),
              enumItem('Flat Fee'),
            ],
            'body',
          ),
          numberOption('Student cost', 'student_cost', 'body'),
          numberOption('Cost premium ID', 'cost_premium_id', 'body'),
          numberOption('Discount rate', 'discount_rate', 'body'),

          booleanOption(
            'Email Lesson Reminders',
            'email_lesson_reminders',
            'body',
          ),
          booleanOption('Email Lesson Notes', 'email_lesson_notes', 'body'),
          booleanOption('SMS Lesson Reminders', 'sms_lesson_reminders', 'body'),

          numberOption('Default Location ID', 'default_location_id', 'body'),

          booleanOption('Unviewed', 'unviewed', 'body'),
        ],
      },
    ],
  }
}
