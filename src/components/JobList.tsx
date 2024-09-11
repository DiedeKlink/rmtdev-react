import JobListItem from "./JobListItem";

export function JobList({ jobItems }) {
  return (
    <ul className="job-list">
      {jobItems.splice(0, 7).map((jobItem) => (
        <JobListItem key={jobItem.id} jobItem={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
