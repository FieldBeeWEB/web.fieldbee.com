import { Task } from "@fieldbee/api";
import { ListContainer, RoundedListItem, SprayingBadge } from "@fieldbee/ui";
import { Divider, Stack, Typography } from "@fieldbee/ui/components";
import { format } from "date-fns";
import { t } from "i18next";
import { DATE_FORMAT } from "../../../helpers/date-format";
import { PhrasesTranslationKeys } from "../../../localization";

interface Props {
  works: Task[] | undefined;
}

export default function FieldWorks({ works }: Props) {
  if (!works)
    return <Typography>{t(PhrasesTranslationKeys.NoTasks)}</Typography>;
  return (
    <ListContainer>
      {works.map((work) => (
        <RoundedListItem key={work.uri}>
          <>
            <SprayingBadge />
            <Stack
              direction="row"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Typography fontSize="14px" fontWeight="600">
                {work.operation.name}
              </Typography>
              <Typography fontSize="14px">
                {format(new Date(work.taskStartDate), DATE_FORMAT)}
              </Typography>
              <Typography fontSize="14px">{work.orgName}</Typography>
            </Stack>
          </>
        </RoundedListItem>
      ))}
    </ListContainer>
  );
}
