import { useQuery } from 'react-query';

import UpdateProfile from '../components/dashboard/UpdateProfile';
import Layout from '../components/layout';
import useAuth from '../hooks/useAuth';
import statsService from '../services/StatsService';

export default function Dashboard() {
  const { data, isLoading } = useQuery('stats', statsService.getStats);
  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  return (
    <Layout>
      <h1 className="font-semibold bg-brandHeaderBackground mx-auto px-5 sm:px-10 py-8 text-3xl">
        Dashboard
      </h1>
      <div className="mx-auto px-5 sm:px-10 pb-10">
        <div className="mt-5 flex flex-col gap-5">
          {!isLoading ? (
            <div className="flex flex-col sm:flex-row gap-5">
              {authenticatedUser.role === 'admin' && (
                <div className="card shadow text-white bg-blue-500 flex-1">
                  <h1 className="font-semibold sm:text-4xl text-center mb-3">
                    {data.numberOfUsers}
                  </h1>
                  <p className="text-center sm:text-lg font-semibold">Users</p>
                </div>
              )}
              <div className="card shadow text-white bg-indigo-500 flex-1">
                <h1 className="font-semibold sm:text-4xl mb-3 text-center">
                  {data.numberOfCourses}
                </h1>
                <p className="text-center sm:text-lg font-semibold">Courses</p>
              </div>
              <div className="card shadow text-white bg-green-500 flex-1">
                <h1 className="font-semibold sm:text-4xl mb-3 text-center">
                  {data.numberOfContents}
                </h1>
                <p className="text-center sm:text-lg font-semibold">Contents</p>
              </div>
            </div>
          ) : null}

          <UpdateProfile />
        </div>
      </div>
    </Layout>
  );
}
