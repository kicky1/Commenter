import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 25,
    paddingTop: theme.spacing.xs,
    fontSize: theme.fontSizes.md,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

interface CommentHtmlProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}

export function Comment({ postedAt, body, author }: CommentHtmlProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" size="xl" />
        <div>
          <Text size="md">{author.name}</Text>
          <Text size="sm" color="dimmed">
            {postedAt}
          </Text>
        </div>
      
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
      </TypographyStylesProvider>
      </Group>
    </Paper>
  );
}