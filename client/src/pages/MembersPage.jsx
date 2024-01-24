import MembersTable from '../components/MembersTable'
import NewMemberForm from '../components/NewMemberForm'

export default function MembersPage() {
  return (
    <div className="d-flex flex-column gap-3 text-secondary">
      <NewMemberForm />
      <MembersTable />
    </div>
  )
}