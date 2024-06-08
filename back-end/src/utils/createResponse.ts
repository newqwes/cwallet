export default (status?: any, message?: any, data: any = {}) => ({status, data: {data, message}});
