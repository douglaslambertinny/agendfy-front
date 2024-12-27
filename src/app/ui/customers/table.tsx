import Image from 'next/image';
import { UpdateService, DeleteService } from '@/app/ui/services/buttons';
import ServiceStatus from '@/app/ui/services/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function servicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
//   const invoices = await fetchFilteredInvoices(query, currentPage);
  const services = [{'id': '1', 'name': 'Troca de óleo', 'amount': 100.00}, {'id': '1', 'name': 'Troca de freios', 'amount': 150.00}];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {services?.map((service) => (
              <div
                key={service.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={service.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${service.name}'s profile picture`}
                      /> */}
                      <p>{service.name}</p>
                    </div>
                    {/* <p className="text-sm text-gray-500">{service.email}</p> */}
                  </div>
                  {/* <ServiceStatus status={service.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(service.amount)}
                    </p>
                    {/* <p>{formatDateToLocal(service.date)}</p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateService id={service.id} />
                    <DeleteService id={service.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {services?.map((service) => (
                <tr
                  key={service.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {/* <div className="flex items-center gap-3">
                      <Image
                        src={service.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${service.name}'s profile picture`}
                      />
                      <p>{service.name}</p>
                    </div> */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {service.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(service.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(service.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ServiceStatus status={service.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateService id={service.id} />
                      <DeleteService id={service.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
