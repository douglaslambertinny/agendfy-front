import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/services/table';
// import { fetchInvoicesPages } from '@/app/lib/data';
import { CreateService } from '@/app/ui/services/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ServicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices',
};


export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    console.log(`Estou na pagina inicial buscando de acordo com o ${searchParams?.query}`)
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = 20;
    // const totalPages = await fetchInvoicesPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Services</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search services..." />
                <CreateService />
            </div>
            <Suspense key={query + currentPage} fallback={<ServicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}