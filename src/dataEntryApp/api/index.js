import httpClient from "common/utils/httpClient";
import response from './response';

export default {
  fetchOperationalModules: () =>
    httpClient.fetchJson("/web/operationalModules/").then(response => response.json),
  fetchForm: uuid => httpClient.fetchJson(`/web/form/${uuid}`).then(response => response.json),
  fetchGenders: () => httpClient.fetchJson("/web/gender/").then(response => response.json),
  saveSubject: subject =>
    httpClient.fetchJson("/individuals", {
      method: "POST",
      body: JSON.stringify(subject)
    }),
    fetchSubjectProfile: async (uuid)=>
    {
      return response.data;
    }


     // httpClient.fetchJson(`/web/subjectProfile?uuid=${uuid}`).then(response => {
    //   console.log(response);
    //   return response.json})

    //httpClient.fetchJson(`/web/subjectProfile?uuid=${uuid}`).then(response => response.json)
};
