import { backendRoute } from "@/app/util"
import matter from "gray-matter"
import { unstable_cache } from "next/cache";

export const fetchLog = unstable_cache(
  async function fetchLog(slug = "") {
    const apiRoute = backendRoute + `/logs/${slug}`;
    const res = await fetch(apiRoute, {
      method: "GET",
    });
    if (res.status == 201) {
      const { data: logdata } = await res.json();
      const { content: mdContent, data: metaData } = matter(logdata.content);
      return {
        status: true,
        payload: {
          metaData,
          logData: {
            ...logdata,
            content: mdContent,
          },
        },
      }
    } else {
      return { status: false };
    }
  },
  ["logs"],
  {
    tags: ["logs"],
  }
);


/*
    {
        status,
        payload: {
            metaData,
            logData: {
                ...logdata,
                content: mdContent
            }
        }
    }
*/