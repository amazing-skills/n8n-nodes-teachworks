import type { INodeProperties } from 'n8n-workflow'
import {
  booleanOption,
  enumItem,
  enumOption,
  numberOption,
  stringOption,
} from './TeachworksContants'

export const TeachworksStudentsOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['students'],
      },
    },

    options: [
      {
        name: 'Get by ID',
        value: 'getById',
        description: 'Get a student by ID',
        action: 'Get a student by ID',
      },
      {
        name: 'Search',
        value: 'search',
        description: 'Search for a student',
        action: 'Search for a student',
        routing: {
          request: {
            method: 'GET',
            url: '/students',
          },
        },
      },
      {
        name: 'Create an Family Student',
        value: 'createFamilyStudent',
        action: 'Create a family student',
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
]

export const TeachworksStudentsFields: INodeProperties[] = [
  {
    displayName: 'Student ID',
    name: 'id',
    type: 'string',
    default: '',
    placeholder: 'Student ID',
    displayOptions: {
      show: {
        operation: ['getById'],
        resource: ['students'],
      },
    },
    routing: {
      request: {
        method: 'GET',
        url: '=/students/{{ $value }}',
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
        resource: ['students'],
      },
    },
    options: [
      stringOption('Customer ID', 'customer_id'),

      stringOption('First Name', 'first_name'),
      stringOption('Last Name', 'last_name'),
      stringOption('Email', 'email'),
      stringOption('Phone Number', 'phone_number'),

      stringOption('School', 'school'),
      stringOption('Grade', 'grade'),
      stringOption('Subject', 'subject'),

      enumOption('Customer type', 'type', [
        { name: 'Family', value: 'family' },
        { name: 'Independent', value: 'independent' },
      ]),
      enumOption('Status', 'status', [
        { name: 'Active', value: 'active' },
        { name: 'Inactive', value: 'inactive' },
        { name: 'Prospective', value: 'prospective' },
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
        operation: ['createFamilyStudent'],
        resource: ['students'],
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
        operation: ['createFamilyStudent'],
        resource: ['students'],
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
    displayName: 'Create Family Student Options',
    name: 'createFamilyStudentOptions',
    type: 'collection',
    default: {},
    placeholder: 'Add Option',
    displayOptions: {
      show: {
        operation: ['createFamilyStudent'],
        resource: ['students'],
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

      booleanOption('Email Lesson Reminders', 'email_lesson_reminders', 'body'),
      booleanOption('Email Lesson Notes', 'email_lesson_notes', 'body'),
      booleanOption('SMS Lesson Reminders', 'sms_lesson_reminders', 'body'),

      numberOption('Default Location ID', 'default_location_id', 'body'),

      booleanOption('Unviewed', 'unviewed', 'body'),
    ],
  },
]
