import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
  import { formatCurrency } from '@/app/lib/utils';
//   import { fetchCardData } from '../../lib/data';
  
  // const iconMap = {
  //   collected: BanknotesIcon,
  //   customers: UserGroupIcon,
  //   pending: ClockIcon,
  //   appointments: InboxIcon,
  // };
  

  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    appointments: InboxIcon,
  };

  export default async function CardWrapper() {
    // const {numberOfCustomers, numberOfAppointments, totalPaidAppointments, totalPendingAppointments} = await fetchCardData();
    const numberOfAppointments = Number('50');
    const numberOfCustomers = Number('50');
    const totalPaidAppointments = formatCurrency(100);
    const totalPendingAppointments = formatCurrency(100);
    return (
      <>
        {/* NOTE: Uncomment this code in Chapter 9 */}
  
        <Card title="Collected" value={totalPaidAppointments} type="collected" />
        <Card title="Pending" value={totalPendingAppointments} type="pending" />
        <Card title="Total appointments" value={numberOfAppointments} type="appointments" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </>
    );
  }
  
  export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'appointments' | 'customers' | 'pending' | 'collected';
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {value}
        </p>
      </div>
    );
  }
  