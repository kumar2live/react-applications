import { useEffect, useState } from 'react';

export default (httpClient) => {
  const [error, seterror] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    seterror(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use((res) => res, (errorRef) => {
    seterror(errorRef);
  });

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [reqInterceptor, resInterceptor]);

  const errorActionHandler = () => {
    seterror(null);
  }

  return [error, errorActionHandler];
}
