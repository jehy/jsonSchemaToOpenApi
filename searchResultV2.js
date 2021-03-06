'use strict';

const hashPattern = '^[A-Z-a-z-0-9_]+$';

const multiModal = {
  type: 'object',
  example: {
    "totalAmount": 4480.11,
    "deeplink": "/ru/f/?env=0#/book/51~-uqs48~2VERSIONv9H9Wf27yKyeiE9TZJGiNG-da5h67pafa81RuCQ4FoJMoRQNVUfRhyGYKyltuGkDhpHEZKDBJ8AMqcJ38qwUiPRoWL1pnAqhbTEv2N0YeFffV9HeRMUiD7GVQyvusYv3DUNKwp1EYvDkZf0FVl1rdzdLFT1eRn4xgNODzJPQnvAeEXlNBv2ezVPJMCTDzJsO~~675efacc-f99e-4989-ac1e-001bec5582c7~~pGkB10wptEBDgoMZTJgvAg..~0~1A6Q~1_0_0~~B~tghgttcn~~00~S~~E~7b3166151111111171111111614316Z.E8a187.uiP0MB114N02c.E8a2c.E8a0187.b00000000-19.FMG00000002c.E8a03l.8RUB~~b3I.IL21MNIP2RUB~~.000~NGFTQXhcW4hcYP03W7bCHE4_204SU9_0PC_X__E______________________e2010630A41300XOW10K~TQXCGThdrchdsn01M5n75m4_223SU9_0PC_X__E______________________62000630A4300XOW10K?",
    "adultAmount": 4480.110000000001,
    "infantAmount": 0,
    "childAmount": 0,
    "tripIds": [
      "OQhdwP",
      "YVhdwP"
    ]
  },
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
    example: {
      "ages": {"stars": 8, "value": 154},
      "delay": {"stars": 6, "value": 17.74},
      "delay15": {"value": 14.52, "stars": -1},
      "delay30": {"value": 3.23, "stars": -1},
      "late": {"stars": 10, "value": 3.23},
      "cancelled": {"stars": 10, "value": 0},
      "seatPitch": {"stars": 10, "value": 83.82},
      "seatPitchE": {"value": 83.82, "stars": 10},
      "seatPitchB": {"value": 86.36, "stars": 2}
    },
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
  example: {
    "timings": [1547546840416, 1547546840417, 1547546840446, 1547546840714, 1547546847813, 1547546848794, 1547546848796, 1547546849038],
    "start": 1547546840416
  },
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

const latitude = {type: 'number', minimum: -90, maximum: 90, example: 10.123};
const longitude = {type: 'number', minimum: -180, maximum: 180, example: -90.319};
const geoPattern = '^[A-Z-0-9]{3}$';
// const planePattern = geoPattern;
const planePattern = '^[A-Z-0-9_]{3,}$';

const cities = {
  type: 'object',
  example: {
    "MOW": {
      "country": "RU",
      "name": "Moscow",
      "code": "MOW",
      "lat": 55.7522,
      "lon": 37.6156
    },
    "AER": {
      "country": "RU",
      "name": "Sochi",
      "code": "AER",
      "lat": 43.6,
      "lon": 39.7303
    },
  },
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
  example: {
    "RU": {
      "name": "Russia",
      "code": "RU"
    }
  },
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
  example: {
    "AER": {
      "country": "RU",
      "city": "AER",
      "code": "AER",
      "name": "Adler",
      "lat": 43.45,
      "lon": 39.9333
    },
    "LED": {
      "country": "RU",
      "city": "LED",
      "code": "LED",
      "name": "Pulkovo",
      "lat": 59.80027778,
      "lon": 30.2625
    },
    "ROV": {
      "country": "RU",
      "city": "ROV",
      "code": "ROV",
      "name": "Platov",
      "lat": 47.4885,
      "lon": 39.9289
    },
  },
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
  example:{
    "MdkVHD": {
      "type": "baggage",
      "code": "0PC",
      "id": "3"
    },
    "CdkVHD": {
      "type": "cabinBaggage",
      "code": "10K",
      "id": "CdkVHD"
    },
    "AdkVHD": {
      "type": "cabinBaggage",
      "code": "1PC",
      "cabinBaggageProps": {
        "width": 36,
        "length": 30,
        "depth": 27,
        "total": 93
      },
      "id": "AdkVHD"
    }
  },
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
      example: {
        "319": "Airbus A319",
        "320": "Airbus A320",
        "321": "Airbus A321",
        "735": "Boeing 737-500",
        "737": "Boeing 737",
        "738": "Boeing 737-800",
        "744": "Boeing 747-400",
        "773": "Boeing 777-300",
        "E70": "Embraer EMB-170",
        "CRJ": "Canadair Jet",
        "SU9": "Sukhoi Superjet 100-95",
        "32A": "Airbus A320 SL",
        "32B": "Airbus A321 SL",
        "73H": "Boeing 737-800 WL"
      },
    },
    alliances: {
      type: 'object',
      "example": {
        "OneWorld": ["AB", "AA", "BA", "CX", "AY", "IB", "JL", "LA", "MH", "QF", "QR", "RJ", "S7", "UL", "JJ"],
        "StarAlliance": ["JP", "A3", "AC", "CA", "AI", "NZ", "NH", "OZ", "OS", "AV", "SN", "CM", "OU", "MS", "ET", "BR", "LO", "LH", "SK", "ZH", "SQ", "SA", "LX", "TP", "TG", "TK", "UA"],
        "SkyTeam": ["SU", "AR", "AM", "UX", "AF", "AZ", "CI", "MU", "CZ", "OK", "DL", "GA", "KQ", "KL", "KE", "ME", "SV", "RO", "VN", "MF"]
      },
      patternProperties: {
        [hashPattern]: {type: 'array', items: {type: 'string', minLength: 2, maxLength: 2}},
      },
      additionalProperties: false,
    },
    infoMessages: {
      type: 'object',
      example: {
        "kufPH5": {
          "code": "PASSEXP_NOT_REQUIRED",
          "id": "kufPH5"
        },
        "AyfPH5": {
          "code": "FAKE_INSTEAD_OF_CHURNING_LIMIT",
          "id": "AyfPH5"
        },
        "ZwfPH5": {
          "code": "REQUIRE_MIDDLE_NAME",
          "id": "ZwfPH5"
        },
      },
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
        example: {
          "from": "MOW",
          "to": "AER",
          "date": "2019-01-20"
        },
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
      example: {
        "adult": 1,
        "child": 0,
        "infant": 0
      },
      type: 'object',
      properties: {
        adult: {type: 'integer', minimum: 0, maximum: 1000},
        child: {type: 'integer', minimum: 0, maximum: 1000},
        infant: {type: 'integer', minimum: 0, maximum: 1000},
      },
      additionalProperties: false,
      required: ['adult', 'child', 'infant'],
    },
    routeKey: {type: 'string', minLength: 10, maxLength: 100, example: '2001MOWAER'},
    lang: {type: 'string', minLength: 2, maxLength: 2, example: 'ru'},
  },
  additionalProperties: false,
  required: ['directions', 'passengerCount', 'routeKey', 'lang'],
};


const prices = {
  type: 'object',
  example: {
    "xqOROJ": {
      "isRefundable": [
        false
      ],
      "isExchangable": [
        false
      ],
      "infoMessageIds": [
        "EqOROJ",
        "AqOROJ",
        "SqOROJ",
        "CqOROJ",
        "BqOROJ",
        "TqOROJ",
        "OqOROJ",
        "ZqOROJ",
        "WqOROJ"
      ],
      "transportationVariantIds": [
        "AvOROJ"
      ],
      "totalAmount": 6473.61,
      "timeScore": 0.39932885906040266,
      "score": 13,
      "tripcoins": 44.084320399999996,
      "is2OW4RT": false,
      "fareKeyIndexes": [
        0
      ],
      "gdsInfoIndex": 0,
      "deeplink": "dummy",
      "isMultiModal": true,
      "multiModal": [
        {
          "totalAmount": 1993.5,
          "deeplink": "https://www.onetwotrip.com/ru/poezda/train/?date=20012019&departure=200120190020&train=020%D0%A3&fromName=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&toName=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3&metaFrom=22823&metaTo=22871&classes[0]=4&classes[1]=6&from=2006004&to=2004001&adults=&children=&infants=",
          "tripIds": [
            "1"
          ]
        },
        {
          "totalAmount": 4480.11,
          "deeplink": "/ru/f/?env=0#/book/51~-uqs48~2VERSIONv9H9Wf27yKyeiE9TZJGiNG-da5h67pafa81RuCQ4FoJMoRQNVUfRhyGYKyltuGkDhpHEZKDBJ8AMqcJ38qwUiPRoWL1pnAqhbTEv2N0YeFffV9HeRMUiD7GVQyvusYv3DUNKwp1EYvDkZf0FVl1rdzdLFT1eRn4xgNODzJPQnvAeEXlNBv2ezVPJMCTDzJsO~~675efacc-f99e-4989-ac1e-001bec5582c7~~pGkB10wptEBDgoMZTJgvAg..~0~1A6Q~1_0_0~~B~tghgttcn~~00~S~~E~7b3166151111111171111111614316Z.E8a187.uiP0MB114N02c.E8a2c.E8a0187.b00000000-19.FMG00000002c.E8a03l.8RUB~~b3I.IL21MNIP2RUB~~.000~NGFTQXhcW4hcYP03W7bCHE4_204SU9_0PC_X__E______________________e2010630A41300XOW10K~TQXCGThdrchdsn01M5n75m4_223SU9_0PC_X__E______________________62000630A4300XOW10K?",
          "adultAmount": 4480.110000000001,
          "infantAmount": 0,
          "childAmount": 0,
          "tripIds": [
            "RtOROJ",
            "QaOROJ"
          ]
        }
      ],
      "id": "xqOROJ"
    },
  },
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
  example: {
    "QH1fJI": {
      "from": "CDG",
      "to": "LHR",
      "airline": "BA",
      "flightNumber": "303",
      "startTerminal": "2A",
      "endTerminal": "5",
      "stars": 9,
      "plane": "320",
      "continued": true,
      "age": 154,
      "flightInfo": {
        "ages": {"stars": 8, "value": 154},
        "delay": {"stars": 6, "value": 17.74},
        "delay15": {"value": 14.52, "stars": -1},
        "delay30": {"value": 3.23, "stars": -1},
        "late": {"stars": 10, "value": 3.23},
        "cancelled": {"stars": 10, "value": 0},
        "seatPitch": {"stars": 10, "value": 83.82},
        "seatPitchE": {"value": 83.82, "stars": 10},
        "seatPitchB": {"value": 86.36, "stars": 2}
      },
      "stopTimeMinutes": "toDo",
      "carrierTripNumber": 303,
      "startDateTime": "2019-02-17T07:15:00",
      "endDateTime": "2019-02-17T07:35:00",
      "flightTimeMinutes": 80,
      "id": "QH1fJI"
    }
  },
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
  example: {
    "RZX9p4": {
      "directionIndex": 0,
      "totalJourneyTimeMinutes": 730,
      "serviceIds": ["jw9cGs"],
      "tripRefs": [{
        "serviceClass": "E",
        "tripId": "QH1fJI",
        "serviceIds": ["jw9cGs"],
        "seatsAvailable": 6
      }, {"serviceClass": "E", "tripId": "gl-HfB", "serviceIds": ["jw9cGs"], "seatsAvailable": 4}],
      "seatsAvailable": 4,
      "id": "RZX9p4"
    },
    "r6wM6v": {
      "directionIndex": 0,
      "totalJourneyTimeMinutes": 435,
      "serviceIds": ["jw9cGs"],
      "tripRefs": [{
        "serviceClass": "E",
        "tripId": "LoVRDC",
        "serviceIds": ["jw9cGs"],
        "seatsAvailable": 4
      }, {"serviceClass": "E", "tripId": "7j5fwG", "serviceIds": ["jw9cGs"], "seatsAvailable": 9}],
      "seatsAvailable": 4,
      "id": "r6wM6v"
    }
  },
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
      example: {"USDEUR":"0.881367883","USDRUB":"67.905200000","USDUAH":"28.409090909"},
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
          example: {"hash":"Su22JUo3ZE1tOLyBtxPJVw=="},
          properties: {hash: {type: 'string', minLength: 24, maxLength: 24}},
          additionalProperties: false,
        },
    },
    searchResultMessages: {
      type: 'object',
      example: {"2OW4RT_MIX_GDS":true,"SHOW_NEWSERP_LINK":true},
      patternProperties: {
        '^[A-Z-0-9_]+$': {type: 'boolean'},
      },
      additionalProperties: false,
    },
    fareKeys: {type: 'array',
      items: {
        type: 'string',
        example: "2VERSIONRSws2SrvcyWnfu7n8cNQ75GYIZTYbtwclwjMOFsUTO/pZJxO6kA7qdNkc2cSUuMFSewYynyP5JObRlNxTBONKVqzthLXLrWqS1UfvH2dK/K9Ls/Aqw1RHADlkn99ZgOM10fMMpddyqo37bjq50uvIb3qEmb1sO1TRruP+sC3zZD4r2aP6D3k9nyqa6/boaT0"
      }
    },
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
