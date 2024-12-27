import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
// import { LatestAppointments} from '@/app/lib/definitions';
// import { fetchLatestAppointments } from '@/app/lib/data';

const latestAppointments = [
  {
    id: 1,
    name: "João",
    service: { id: 1, name: "unha", time: "2014" },
    image_url: "/customers/evil-rabbit.png",
    mobile: "+5511966325206",
    amount: 50.00,
  },
  {
    id: 2,
    name: "Maria",
    service: { id: 1, name: "unha", time: "2014" },
    image_url: "/customers/amy-burns.png",
    mobile: "+5511966325206",
    amount: 100.00,
  },
];

export default async function LatestAppointments() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // const latestAppointments = await fetchLatestAppointments();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Appointments
      </h2>
      <div className="bg-gray-50 flex grow flex-col justify-between rounded-xl p-4">
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className="bg-white px-6">
          {latestAppointments.map((appointment, i) => {
            return (
              <div
                key={appointment.id}
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                  {
                    "border-t": i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={appointment.image_url}
                    alt={`${appointment.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold truncate text-sm md:text-base">
                      {appointment.name}
                    </p>
                    <p className="text-gray-500 hidden text-sm sm:block">
                      {appointment.mobile}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} font-medium truncate text-sm md:text-base`}
                >
                  {appointment.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="text-gray-500 h-5 w-5" />
          <h3 className="text-gray-500 ml-2 text-sm">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
