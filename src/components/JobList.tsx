import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        jobItems
          .splice(0, 7)
          .map((jobItem) => <JobListItem key={jobItem.id} jobItem={jobItem} />)}
    </ul>
  );
}

export default JobList;
