import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTasks,
  selectTasksData,
  selectTask,
  ITask,
  ITaskNames,
  NOT_VERIFY_TASK_NAMES,
} from '../../../entities/Tasks';
import { Button, HeaderCoins } from '../../../shared/ui';
import { Icon, Wrapper, Tasks, TaskWrapper, TextWrapper, Text, Reward, Loader, CheckCircleOutlined } from './styled';
import { vibrateNow } from '../../../shared/libs/vibration.ts';
import { initUtils } from '@tma.js/sdk';
import { getReadableCount } from '../../../shared/libs/toNormalNumber.ts';

const utils = initUtils();

const btnStyle = (is_claimed: boolean | null): 'primary' | 'secondary' => {
  if (is_claimed === null) {
    return 'secondary';
  }
  return 'primary';
};

const getRandom = (task_name: ITaskNames) => {
  return NOT_VERIFY_TASK_NAMES.includes(task_name) || Math.random() < 0.65;
};

export const TasksPage: FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksData);
  const [clicked, setClicked] = useState({});

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const isClicked = (id: number) => {
    // @ts-ignore
    return clicked[id];
  };

  const handleClick = (task: ITask) => {
    if (isClicked(task.id)) {
      return;
    }

    vibrateNow('success', 'impact', 'light');
    if (task.is_claimed === false) {
      if (NOT_VERIFY_TASK_NAMES.includes(task.task_name)) {
        setClicked({ ...clicked, [task.id]: true });
      }
      dispatch(selectTask(task.task_name));
      return;
    }

    if (!NOT_VERIFY_TASK_NAMES.includes(task.task_name)) {
      setClicked({ ...clicked, [task.id]: true });
    }

    if (task.is_claimed === null) {
      if (getRandom(task.task_name)) {
        dispatch(selectTask(task.task_name));
      }
      if (task.link) {
        if (task.link.includes('https://t.me/')) {
          utils.openTelegramLink(task.link);
        } else {
          utils.openLink(task.link);
        }
      }
    }
  };

  const getButtonName = (task: ITask) => {
    if (isClicked(task.id)) {
      return <Loader/>;
    }

    if (task.is_claimed === null) {
      return 'Start';
    }

    return 'Claim';
  };

  return (
    <Wrapper>
      <HeaderCoins/>
      <Tasks>
        {tasks.map((task) => (
          <TaskWrapper key={task.id}>
            <Icon iconName={task.task_name}/>
            <TextWrapper>
              <Text>{task.text}</Text>
              <Reward>+{getReadableCount(task.reward)}✨</Reward>
            </TextWrapper>
            {
              !!task.is_claimed ?
                <CheckCircleOutlined/> :
                <Button
                  isDisabled={isClicked(task.id)}
                  btnStyle={btnStyle(task.is_claimed)}
                  onClick={() => handleClick(task)}>{getButtonName(task)}</Button>
            }
          </TaskWrapper>
        ))}
      </Tasks>
    </Wrapper>

  );
};

