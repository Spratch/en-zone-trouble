import { useEffect, useMemo, useState } from "react";
import type { ArrayOfObjectsInputProps, ArrayOfObjectsMember } from "sanity";
import { useClient } from "sanity";

type ArrayItem = {
  _key: string;
  _type: string;
  date?: string;
  _ref?: string;
};

export function CustomArrayInput(props: ArrayOfObjectsInputProps) {
  const { renderDefault } = props;
  const client = useClient({ apiVersion: "2024-01-01" });

  const [refDates, setRefDates] = useState<Record<string, string>>({});

  useEffect(() => {
    const value = (props.value || []) as ArrayItem[];
    const refs = value.filter((item) => item._ref).map((item) => item._ref!);

    if (refs.length === 0) return;

    client
      .fetch<
        { _id: string; date: string }[]
      >(`*[_id in $ids]{ _id, date }`, { ids: refs })
      .then((docs) => {
        const map: Record<string, string> = {};
        docs.forEach((doc) => {
          map[doc._id] = doc.date;
        });
        setRefDates(map);
      });
  }, [props.value, client]);

  const sortedObjects = useMemo(() => {
    const value = (props.value || []) as ArrayItem[];

    return value
      .sort((a, b) => {
        const dateA = a.date ?? (a._ref ? refDates[a._ref] : "") ?? "";
        const dateB = b.date ?? (b._ref ? refDates[b._ref] : "") ?? "";

        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateA.localeCompare(dateB);
      })
      .map((entry) => entry._key);
  }, [props.value, refDates]);

  const members = props.members || [];
  const membersByKey = members.reduce(
    (acc, member) => {
      acc[member.key] = member;
      return acc;
    },
    {} as Record<string, ArrayOfObjectsMember>,
  );

  const sortedMembers = sortedObjects
    .filter((key) => key)
    .map((key) => membersByKey[key]) as ArrayOfObjectsMember[];

  return <div>{renderDefault({ ...props, members: sortedMembers || [] })}</div>;
}
