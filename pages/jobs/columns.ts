import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue'
const { update } = useStrapi();
const router = useRouter();

interface Job {
  id: number;
  title: string;
  description: string;
  closing_date: string;
  location: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  is_active: boolean;
  category: string;
  skills: [];
  benefits: [];
  duties: [];

}

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: 'title',
    header: () => h('div', { class: 'text-left'}, 'Title'),
    cell: ({row}: any) => {
        const title = row.getValue("title");
        return h('div', { 
            class: 'text-left font-medium cursor-pointer text-blue-600 hover:underline',
            onClick: () => router.push(`/jobs/${row.original.id}`),
        }, title);
    }
  },
  {
    accessorKey: 'category',
    header: () => h('div', { class: 'text-left'}, 'Category'),
    cell: ({row}: any) => {
        const category= row.getValue("category");
        return h('div', { 
            class: 'text-left font-medium' 
        },  category);
    }
  },
  {
    accessorKey: 'location',
    header: () => h('div', { class: 'text-left'}, 'Location'),
    cell: ({row}: any) => {
        const location= row.getValue("location");
        return h('div', { class: 'text-left font-medium' }, location);
    }
  },
  {
    accessorKey: 'closing_date',
    header: () => h('div', { class: 'text-left'}, 'Closing Date'),
    cell: ({row}: any) => {
        const closing_date= row.getValue("closing_date");
        return h('div', { class: 'text-left font-medium' }, closing_date);
    }
  },
  {
    accessorKey: 'is_active',
    header: () => h('div', { class: 'text-left'}, 'Active'),
    cell: ({row,}: any) => {
        const isActiveRef = ref(row.original.is_active); // two-way binding ref
        const handleCheckboxChange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            isActiveRef.value = target.checked; // update the local state
            console.log(isActiveRef.value, row);
            // Update the database
            update('job-postings', row.original.id, { is_active: isActiveRef.value });
        }

        return h('div', { class: 'text-left font-medium' }, [
            h('input', {
                type: 'checkbox',
                checked: isActiveRef.value,
                onChange: handleCheckboxChange,
                class: 'form-checkbox h-5 w-5 text-blue-600',
            }),
        ]);
    }
  },
]