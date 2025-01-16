import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue'

interface User {
    name:  string;
    email: string;
    role:  string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left'}, 'Name'),
    cell: ({row}: any) => {
        const name = row.getValue("name");
        return h('div', { class: 'text-left font-medium' }, name);
    }
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-left'}, 'Email'),
    cell: ({row}: any) => {
        const email= row.getValue("email");
        return h('div', { class: 'text-left font-medium' },  email);
    }
  },
  {
    accessorKey: 'role',
    header: () => h('div', { class: 'text-left'}, 'Role'),
    cell: ({row}: any) => {
        const role = row.getValue("role");
        return h('div', { class: 'text-left font-medium' }, role);
    }
  },
  {
    accessorKey: 'actions',
    header: () => h('div', { class: 'text-left' }, 'Actions'),
    cell: ({ row }: any) => {
      const user = row.original; // Access the entire user object
      return h(
        'div',
        { class: 'flex space-x-2' },
        [
          h(
            'button',
            {
              class: 'bg-blue-500 text-white px-2 py-1 rounded',
              onClick: () => editUser(user),
            },
            'Edit'
          ),
          h(
            'button',
            {
              class: 'bg-red-500 text-white px-2 py-1 rounded',
              onClick: () => deleteUser(user),
            },
            'Delete'
          ),
        ]
      );
    },
  },

]
// Actions for edit and delete
const editUser = (user: User) => {
    console.log('Edit user:', user);
    // Open modal or navigate to an edit page
  };
  
  const deleteUser = (user: User) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      console.log('Deleted user:', user);
      // Call API or update the data store to remove the user
    }
  };