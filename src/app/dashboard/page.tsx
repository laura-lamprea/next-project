import OneView from 'src/sections/one/view';

export const metadata = {
  title: 'Dashboard: Home',
};

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (!session) redirect('/api/auth/signin');
  return <OneView />;
}
