'use strict';

const Ajv = require('ajv');
const fs = require('fs');

const schema = require('./searchResultV2');
const ajv = new Ajv({verbose: true, allErrors: true});
const toOpenApi = require('json-schema-to-openapi-schema');
const OpenAPISchemaValidator = require('openapi-schema-validator').default;
const swaggerDraft = require('./swaggerDraft.json');

function debug(data)
{
  console.log(data);
}

function clone(obj)
{
  return JSON.parse(JSON.stringify(obj));
}

function isPrimitive(test) {
  return (test !== Object(test));
}

function fixPatternProperties(obj)
{
  const defaultValue = obj instanceof Array && [] || {};
  return Object.entries(obj).reduce((res, [name, value])=>{
    if(name==='additionalProperties')
    {
      if(!res.additionalProperties)
      {
        res.additionalProperties = value;
      }
      return res;
    }
    if(name==='patternProperties')
    {
      const inner = fixPatternProperties(Object.values(value)[0]);
      res.additionalProperties = inner;
      res['x-pattern'] = Object.keys(value)[0];
      return res;
    }
    if(isPrimitive(value))
    {
      res[name]=value;
      return res;
    }
    res[name]=fixPatternProperties(value);
    return res;
  }, defaultValue)
}


debug('compiling schema via ajv');
try {
  ajv.compile(schema);
}
catch(err)
{
  debug('Schema is invalid');
  process.exit(1);
}
debug('schema is valid');

fs.writeFileSync('jsonSchema.json', JSON.stringify(schema, null, 3), 'utf8');

debug('converting patternProperties');
const propertiesConverted  = fixPatternProperties(schema);
fs.writeFileSync('jsonSchemaConvertedProps.json', JSON.stringify(propertiesConverted, null, 3), 'utf8');

const convertedSchema = toOpenApi(Object.assign( {}, propertiesConverted, {'$schema': 'http://json-schema.org/draft-07/schema#'}));

// debug(convertedSchema);
fs.writeFileSync('openApi.json', JSON.stringify(convertedSchema, null, 3), 'utf8');


var validator = new OpenAPISchemaValidator({
  //optional
  version: 3,
  // optional
  version2Extensions: {
    /* place any properties here to extend the schema. */
  },
  // optional
  version3Extensions: {
    /* place any properties here to extend the schema. */
  }
});


const swaggerDoc = clone(swaggerDraft);
swaggerDoc.paths["/_api/searching/startSync5/"].get.responses['200'].content['application/json'].schema = convertedSchema.schema;
fs.writeFileSync('swagger.json', JSON.stringify(swaggerDoc, null, 3), 'utf8');


const errors = validator.validate(swaggerDoc);
if(errors && errors.length)
{
  debug(`There were errors while validating converted schema as open api:`);
  debug(JSON.stringify(errors, null, 3));
  process.exit(1);
}

debug('validation of coverted schema okay!');
process.exit(0);
