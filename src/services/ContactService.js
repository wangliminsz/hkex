import axios from "axios";
import airtable from 'airtable';

// ~~~~~~~~~~~~~~~~~~~~

const airtableUrl_vite = process.env.VITE_air_url;
const airtableKey_vite = process.env.VITE_air_key;

let air_url = ''
air_url = airtableUrl_vite.replace(/^"|"$/g, '')

let air_key = ''
air_key = airtableKey_vite.replace(/^"|"$/g, '')

// ~~~~~~~~~~~~~~~~~~~~

export class ContactService {

  // hkex 2024-05
  static serverAirURL_hk = air_url;
  static air_token_hk = air_key

  static getHK_main() {

    console.log("hk_Main--->", this.serverAirURL_hk)

    let dataURL = `${this.serverAirURL_hk}/main`;
    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_hk}`
    };

    // console.log('hk hongkong')
    // return axios.get(dataURL, { headers: headers });

    return new Promise((resolve, reject) => {
      let allRecords = [];
      let offset = '';

      const fetchData = () => {
        axios.get(dataURL, {
          headers: headers,
          params: {
            offset: offset
          }
        }).then(res => {
          const { records, offset: newOffset } = res.data;
          // console.log('offset---->>>', offset, newOffset)
          allRecords = allRecords.concat(records);
          if (newOffset) {
            offset = newOffset;
            // console.log('offset---->>>', offset, newOffset)
            // dataURL = `${this.serverAirURL}/thai_notify?filterByFormula={user_id}='${userId}'&offset=${newOffset}`;
            dataURL = `${this.serverAirURL_hk}/main`;
            fetchData();
          } else {
            resolve(allRecords);
          }
        }).catch(err => {
          reject(err);
        });
      };

      fetchData();
    });

  }


  static async deleteHKRecord(contactId, userId) {

    if (contactId) {

      airtable.configure({
        apiKey: `${this.air_token_hk}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to insert the record into
      const base = airtable.base('apppvin1yOfyMuXT4');
      const table = base('tbl2fcihRAPrJHMYt');

      const recordQuery = await table.select({ filterByFormula: `{id} = ${contactId}` }).firstPage();

      let airId = ''

      if (recordQuery.length > 0) {
        const record = recordQuery[0];
        // console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
        airId = record.id
      } else {
        console.log(`No record found with ID ${contactId}`);
      }

      if (airId) {
        // let dataURL = `${this.serverAirURL}/thai_notify?records%5B%5D=${airId}&user_id=${userId}`;
        let dataURL = `${this.serverAirURL_hk}/main?records%5B%5D=${airId}`;
        let headers = {
          'Authorization': `Bearer ${this.air_token_hk}`
        };
        return axios.delete(dataURL, { headers: headers });
      }
    }
  }

  static async getHKRecord(contactId, userId) {

    if (contactId) {

      // AND({id}=${contactId}, {user_id}='${userId}')
      let dataURL = `${this.serverAirURL_hk}/main?filterByFormula=({id}=${contactId})`
      let headers = {
        'Authorization': `Bearer ${this.air_token_hk}`
      };
      return axios.get(dataURL, { headers: headers });
    }
  }

  static getUpstreams(userId) {

    let dataURL = `${this.serverAirURL_hk}/upstream`;
    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_hk}`
    };

    return axios.get(dataURL, { headers: headers });
  }


  static getChannels(userId) {

    let dataURL = `${this.serverAirURL_hk}/channel`;
    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_hk}`
    };

    return axios.get(dataURL, { headers: headers });

  }


  static getUpstream(upId) {

    if (upId) {

      let dataURL = `${this.serverAirURL_hk}/upstream?filterByFormula=({id}=${upId})`;
      // console.log('from js--->', dataURL)
      let headers = {
        'Content-Type': 'application/json', // Example header
        'Authorization': `Bearer ${this.air_token_hk}`
      };

      return axios.get(dataURL, { headers: headers });
    }
  }

  static getChannel(chId) {

    if (chId) {

      let dataURL = `${this.serverAirURL_hk}/channel?filterByFormula=({id}=${chId})`;
      let headers = {
        'Content-Type': 'application/json', // Example header
        'Authorization': `Bearer ${this.air_token_hk}`
      };

      return axios.get(dataURL, { headers: headers });

    }
  }

  // by chatGPT
  static async airUpdateRecord(recordObj, contactId) {

    // console.log('js oth_cny_1 --->>>', recordObj)

    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token_hk}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to insert the record into
      const base = airtable.base('apppvin1yOfyMuXT4');
      const table = base('tbl2fcihRAPrJHMYt');

      table.select({ filterByFormula: `{id} = ${contactId}` }).firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (records.length > 0) {
          const record = records[0];
          const airId = record.id;

          // delete fields that are not editable
          // delete recordObj.fields.id;
          // delete recordObj.fields.created_at;

          delete recordObj.id;
          // delete recordObj.created_at;

          // delete recordObj.cny_1;
          // delete recordObj.cny_2;
          // delete recordObj.cny_3;

          delete recordObj.cny_usd_1;
          delete recordObj.cny_usd_2;
          delete recordObj.cny_usd_3;
          delete recordObj.cny_usd_4;
          delete recordObj.cny_usd_5;
          delete recordObj.cny_usd_6;

          // delete recordObj.cny_hkd_1;
          // delete recordObj.cny_hkd_2;
          // delete recordObj.cny_hkd_3;

          // delete recordObj.cny_oth_1;
          // delete recordObj.cny_oth_2;
          // delete recordObj.cny_oth_3;

          if (recordObj.channel_1) {
            recordObj.channel_1 = String(recordObj.channel_1)
          }
          if (recordObj.channel_2) {
            recordObj.channel_2 = String(recordObj.channel_2)
          }
          if (recordObj.channel_3) {
            recordObj.channel_3 = String(recordObj.channel_3)
          }
          if (recordObj.channel_4) {
            recordObj.channel_4 = String(recordObj.channel_4)
          }
          if (recordObj.channel_5) {
            recordObj.channel_5 = String(recordObj.channel_5)
          }
          if (recordObj.channel_6) {
            recordObj.channel_6 = String(recordObj.channel_6)
          }

          // recordObj.upstream = String(recordObj.upstream)
          // recordObj.upstream_2 = String(recordObj.upstream_2)
          // recordObj.upstream_3 = String(recordObj.upstream_3)

          // console.log('channel', recordObj.channel, typeof(recordObj.channel))

          // update the record in Airtable
          table.update(airId, recordObj, (err, record) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            // console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
            resolve(record.id);
          });
        } else {
          console.log(`No record found with ID ${contactId}`);
          resolve(null);
        }
      });
    });
  }

  // by chatGPT
  static async airInsertRecord(recordObj) {
    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token_hk}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to insert the record into
      const base = airtable.base('apppvin1yOfyMuXT4');
      const table = base('tbl2fcihRAPrJHMYt');

      // insert the record into the Airtable table
      table.create(recordObj, { typecast: true }, (err, newRecord) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        // console.log(`New record created with ID ${newRecord.id}`);
        resolve(newRecord.id);
      });
    });
  }

}