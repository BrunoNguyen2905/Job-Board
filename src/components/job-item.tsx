import React from "react";
import {
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";
import { Link } from "react-router-dom";
import getMonthsDaysDifference from "../util/get-months-days-difference";

type TJobItemProps = {
  job: {
    title: string;
    description: string;
    location: {
      display_name: string;
    };
    company: {
      display_name: string;
    };
    contract_time: string;
    salary_max: number;
    salary_min: number;
    redirect_url: string;
    category: {
      label: string;
      tag: string;
    };
    created: Date;
  };
};

const JobItem: React.FC<TJobItemProps> = ({ job }) => {
  const jobTags: string[] = [
    `${job?.contract_time ? job?.contract_time : null}`,
    `${job.category.tag ? job.category.tag : null}`,
  ];
  const jobCreatedDate = getMonthsDaysDifference(
    new Date(job.created),
    new Date(),
  );
  return (
    <div id="" className="w-full border-white border rounded px-8 py-4">
      <p className="text-xs font-medium mb-1">Looking for</p>
      <h2 className="text-lg mb-2 inline">{job.title}</h2>
      <ul className="my-2">
        {!!jobTags?.length &&
          jobTags
            ?.filter((tag) => tag !== "null")
            .map((tag, index) => (
              <li
                key={index}
                className="inline-block leading-tight mr-4 mb-2 py-0.75 px-3 border border-gray-100 rounded-full text-xs text-dyn-text-strong bg-dyn-bg-100 dark:bg-dyn-bg-300"
              >
                {tag}
              </li>
            ))}
      </ul>
      <div className="flex my-2 items-center">
        <span className="collaboration-mapmarker inline-block mr-2">
          <FontAwesomeIcon icon={faLocationDot} size={"xs"} />
        </span>
        <span className="text-sm capitalize">{job.location.display_name}</span>
      </div>
      <div className="flex my-2 items-center">
        <span className="collaboration-mapmarker inline-block mr-2">
          <FontAwesomeIcon icon={faCalendarDays} size={"xs"} />
        </span>
        <span className="text-sm">Created {jobCreatedDate} ago</span>
      </div>

      <div className="text-sm mt-2 break-words">{job.description}</div>
      <div className="text-sm mt-2 break-words italic">
        <div>Salary min: {job.salary_min}</div>
        <div>Salary max: {job.salary_max}</div>
      </div>
      <div className="mt-2 flex flex-col justify-between md:flex-row">
        <div className="flex items-start">
          <div className="mt-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full bg-cover bg-center bg-no-repeat cursor-pointer"></div>
          </div>
          <div className="ml-2 mt-4">
            <h3 className="text-xs font-medium mb-1">
              <a className="text-md hover:text-primary-700 break-words">
                {job.company.display_name}
              </a>
            </h3>
          </div>
        </div>
        <div className="flex my-4 md:my-0">
          <Link to={`${job.redirect_url}`} target="_blank">
            <Button title={"Apply"} />
          </Link>
          <Button
            title={"Save Job"}
            onBtnClick={() => console.log("job saved successfully")}
          />
        </div>
      </div>
    </div>
  );
};

export default JobItem;
