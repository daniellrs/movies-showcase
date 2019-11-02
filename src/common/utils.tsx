const apiKey = 'c5850ed73901b8d268d0898a8a9d8bff';
const baseURL = 'https://api.themoviedb.org/3'

/**
 * Make get requests to baseURL above plus eventual params
 */
export const get = async (path: string, data: {[key: string]: any} = {}, config: {[key: string]: any} = {}) => {

  data.api_key = apiKey;
  const params = processRequestData(data)

  const response = await fetch(`${baseURL}${path}${params}`, {
    method: 'GET',
    ...config
  })
  
  return response.json()
}

/**
 * Process the received data for GET requests
 * 
 * Ex:
 *  If receives an object {id: 1, orderBy: 'relevance'} returns '?id=1&orderBy=relevance'
 */
const processRequestData = (data: {[key: string]: any}): string => {
  const dataKeys = Object.keys(data)
  let params = ''
  dataKeys.forEach((key, index) => {
    if(index === 0) params += '?'
    params += `${key}=${(data)[key]}`
    if(index !== dataKeys.length-1) params += '&'
  })

  return params
}

/**
 * Transform sql date to readable date in ametican format
 * 
 * Ex:
 *  If receives an sql date like 2019-11-25 it will return 11/25/2019  
 */
export const sqlToReadableDate = (sqlDate: string): string => {
  if(!sqlDate) return ''
  return `${sqlDate.substring(5, 7)}/${sqlDate.substring(8)}/${sqlDate.substring(0, 4)}`
}