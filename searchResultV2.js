'use strict';

const hashPattern = '^[A-Z-a-z-0-9_]+$';

const multiModal = {
  type: 'object',
  properties:
    {
      adultAmount: {type: 'number'},
      infantAmount: {type: 'number'},
      childAmount: {type: 'number'},
      totalAmount: {type: 'number'},
      isBadPrice: {type: 'boolean'},
      isCharter: {type: 'boolean'},
      timeScore: {type: 'number'},
      score: {type: 'number'},
      tripcoins: {type: 'number'},
      gdsInfoIndex: {type: 'integer'},
      is2OW4RT: {type: 'boolean'},
      isRefundable: {type: 'boolean'},
      isExchangable: {type: 'boolean'},
      deeplink: {type: 'string'},
      tripIds: {
        type: 'array',
        items: {type: 'string'},
      },
    },
  required: ['totalAmount', 'deeplink', 'tripIds'],
  additionalProperties: false,
};

const flightInfo = {
  type: 'object',
  patternProperties: {
    [hashPattern]: {
      type: 'object',
      properties: {
        stars: {type: 'integer'},
        value: {type: 'number'},
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

const infoMsg = {
  type: 'object',
  properties: {
    code: {type: 'string'},
    id: {type: 'string'},
    message: {type: 'string'},
  },
  additionalProperties: false,
  required: ['code', 'id'],
};

const timing = {
  type: 'object',
  properties: {
    start: {type: 'integer'},
    timings: {
      type: 'array',
      items:
        {type: 'integer'},
    },
  },
  additionalProperties: false,
};

const latitude = {type: 'number', minimum: -90, maximum: 90};
const longitude = {type: 'number', minimum: -180, maximum: 180};
const geoPattern = '^[A-Z-0-9]{3}$';
// const planePattern = geoPattern;
const planePattern = '^[A-Z-0-9_]{3,}$';

const cities = {
  type: 'object',
  patternProperties: {
    [geoPattern]: {
      type: 'object',
      properties: {
        country: {type: 'string', minLength: 2, maxLength: 2},
        name: {type: 'string', minLength: 2, maxLength: 40},
        code: {type: 'string', minLength: 3, maxLength: 3},
        lat: latitude,
        lon: longitude,
      },
      additionalProperties: false,
      required: ['country', 'name', 'code'],
    },
  },
  additionalProperties: false,
};

const countries = {
  type: 'object',
  patternProperties: {
    '^[A-Z-0-9]{2}$': {
      type: 'object',
      properties: {
        name: {type: 'string', minLength: 2, maxLength: 40},
        code: {type: 'string', minLength: 2, maxLength: 2},
      },
      additionalProperties: false,
      required: ['name', 'code'],
    },
  },
  additionalProperties: false,
};

const airports = {
  type: 'object',
  patternProperties: {
    [geoPattern]: {
      type: 'object',
      properties: {
        country: {type: 'string', minLength: 2, maxLength: 2},
        city: {type: 'string', minLength: 3, maxLength: 3},
        name: {type: 'string', minLength: 2, maxLength: 40},
        code: {type: 'string', minLength: 3, maxLength: 3},
        lat: latitude,
        lon: longitude,
      },
      additionalProperties: false,
      required: ['country', 'city', 'name', 'code'],
    },
  },
  additionalProperties: false,
};

const services = {
  type: 'object',
  patternProperties: {
    [hashPattern]: {
      type: 'object',
      properties: {
        id: {type: 'string'},
        type: {type: 'string'},
        code: {type: 'string'},
        cabinBaggageProps: {
          type: 'object',
          properties: {
            width: {type: 'integer'},
            length: {type: 'integer'},
            depth: {type: 'integer'},
            total: {type: 'integer'},
          },
          additionalProperties: false,
          required: ['width', 'length'],
        },
      },
      additionalProperties: false,
      required: ['id', 'type', 'code'],
    },
  },
  additionalProperties: false,
};

const references = {
  type: 'object',
  properties: {
    planes: {
      type: 'object',
      patternProperties: {
        [planePattern]: {type: 'string'},
      },
      additionalProperties: false,
    },
    alliances: {
      type: 'object',
      patternProperties: {
        [hashPattern]: {type: 'array', items: {type: 'string', minLength: 2, maxLength: 2}},
      },
      additionalProperties: false,
    },
    infoMessages: {
      type: 'object',
      patternProperties: {
        '^[A-Z-0-9_]+$': infoMsg,
      },
      additionalProperties: false,
    },
    cities,
    countries,
    airports,
    services,
  },
  additionalProperties: false,
};

const requestInfo = {
  type: 'object',
  properties: {
    directions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          from: {type: 'string', minLength: 3, maxLength: 3},
          to: {type: 'string', minLength: 3, maxLength: 3},
          date: {type: 'string', minLength: 10, maxLength: 10},
        },
        additionalProperties: false,
        required: ['from', 'to', 'date'],
      },
    },
    passengerCount: {
      type: 'object',
      properties: {
        adult: {type: 'integer', minimum: 0, maximum: 1000},
        child: {type: 'integer', minimum: 0, maximum: 1000},
        infant: {type: 'integer', minimum: 0, maximum: 1000},
      },
      additionalProperties: false,
      required: ['adult', 'child', 'infant'],
    },
    routeKey: {type: 'string', minLength: 10, maxLength: 100},
    lang: {type: 'string', minLength: 2, maxLength: 2},
  },
  additionalProperties: false,
  required: ['directions', 'passengerCount', 'routeKey', 'lang'],
};


const prices = {
  type: 'object',
  patternProperties: {
    [hashPattern]: {
      type: 'object',
      properties: {
        multiModal: {type: 'array', items: multiModal},
        isMultiModal: {type: 'boolean'},
        id: {type: 'string'},
        deeplink: {type: 'string'},
        adultAmount: {type: 'number'},
        infantAmount: {type: 'number'},
        childAmount: {type: 'number'},
        totalAmount: {type: 'number'},
        isBadPrice: {type: 'boolean'},
        isCharter: {type: 'boolean'},
        timeScore: {type: 'number'},
        score: {type: 'number'},
        tripcoins: {type: 'number'},
        gdsInfoIndex: {type: 'integer'},
        is2OW4RT: {type: 'boolean'},
        isRefundable: {type: 'array', items: {type: 'boolean'}},
        isExchangable: {type: 'array', items: {type: 'boolean'}},
        infoMessageIds: {type: 'array', items: {type: 'string'}},
        fareKeyIndexes: {type: 'array', items: {type: 'integer'}},
        transportationVariantIds: {type: 'array', items: {type: 'string'}},
      },
      additionalProperties: false,
      required: ['id', 'totalAmount'],
    },
  },
  additionalProperties: false,
};

const trips = {
  type: 'object',
  patternProperties: {
    [hashPattern]: {
      type: 'object',
      properties: {
        id: {type: 'string'},
        transportType: {enum: ['train', 'plane']},
        from: {type: 'string', minLength: 3, maxLength: 3},
        to: {type: 'string', minLength: 3, maxLength: 3},
        airline: {type: 'string'},
        operatingCarrier: {type: 'string'},
        flightNumber: {type: 'string'},
        startTerminal: {type: 'string'},
        endTerminal: {type: 'string'},
        stars: {type: 'integer'},
        plane: {type: 'string'},
        age: {type: 'integer'},
        // isThrough: {type: 'boolean'},
        continued: {type: 'boolean'},
        flightTimeMinutes: {type: 'integer'},
        stopTimeMinutes: {enum: ['toDo']}, // toDo implement
        carrierTripNumber: {type: 'integer'},
        startDateTime: {type: 'string'},
        endDateTime: {type: 'string'},
        flightInfo,
      },
      additionalProperties: false,
      required: ['id', 'from', 'to', 'flightNumber', 'startDateTime', 'endDateTime'],
    },
  },
  additionalProperties: false,
};

const transportationVariants = {
  type: 'object',
  patternProperties: {
    [hashPattern]: {
      type: 'object',
      properties: {
        id: {type: 'string'},
        directionIndex: {type: 'integer'},
        totalJourneyTimeMinutes: {type: 'integer'},
        seatsAvailable: {type: 'integer'},
        serviceIds: {type: 'array', items: {type: 'string'}},
        tripRefs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              serviceClass: {type: 'string', minLength: 1, maxLength: 1},
              // reserveClass: {type: 'string', minLength: 1, maxLength: 1},
              tripId: {type: 'string'},
              serviceIds: {type: 'array', items: {type: 'string'}},
              seatsAvailable: {type: 'integer'},
            },
            additionalProperties: false,
            required: ['tripId'],
          },
        },
      },
      additionalProperties: false,
      required: ['id', 'directionIndex', 'tripRefs'],
    },
  },
  additionalProperties: false,
};

const searchResult = {
  title: 'SearchResult_v2',
  description: 'SearchResult_v2 schema',
  type: 'object',
  properties: {
    currency: {type: 'string', minLength: 3, maxLength: 3},
    tripcoinsCurrency: {type: 'string', minLength: 3, maxLength: 3},
    requestInfo,
    references,
    id: {type: 'string', minLength: 36, maxLength: 36},
    version: {enum: [2]},
    env: {type: 'integer', minimum: 1, maximum: 10000},
    fromCache: {type: 'boolean'},
    rates: {
      type: 'object',
      patternProperties: {
        '^[A-Z]{6}$': {type: 'string'},
      },
      additionalProperties: false,
    },
    timings: timing,
    gdsInfos: {
      type: 'array',
      items:
        {
          type: 'object',
          properties: {hash: {type: 'string', minLength: 24, maxLength: 24}},
          additionalProperties: false,
        },
    },
    searchResultMessages: {
      type: 'object',
      patternProperties: {
        '^[A-Z-0-9_]+$': {type: 'boolean'},
      },
      additionalProperties: false,
    },
    fareKeys: {type: 'array', items: {type: 'string'}},
    transportationVariants,
    trips,
    prices,
  },
  additionalProperties: false,
  required: ['id', 'version', 'currency', 'tripcoinsCurrency'],
};

module.exports = {
  schema: searchResult,
};
