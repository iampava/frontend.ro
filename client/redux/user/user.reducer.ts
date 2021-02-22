import { UserState } from './types';
import { USER_INFO, USER_NOTIFICATIONS } from './user.actions';

export const defaultUserState = {
  info: undefined,
  notifications: {
    list: undefined, unread: 0, unreadCount: 2, page: 0, end: false,
  },
};

const initialState: UserState = defaultUserState;

export const userReducer = (state = initialState, action: { type: string; payload: any; })
  : UserState => {
  switch (action.type) {
    case USER_INFO.LOAD: {
      return {
        ...state,
        info: action.payload,
      };
    }

    case USER_NOTIFICATIONS.ADD: {
      let { index, notifications } = action.payload;

      if (!Array.isArray(notifications)) {
        notifications = [notifications];
      }
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: [...state.notifications.list.slice(0, index),
            ...notifications,
            ...state.notifications.list.slice(index)],
        },
      };
    }

    case USER_NOTIFICATIONS.LOAD: {
      const { newNotifications } = action.payload;

      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: state.notifications.list
            ? [...state.notifications.list, ...newNotifications]
            : newNotifications,
          page: state.notifications.page + 1,
          end: newNotifications.length === 0,
        },
      };
    }
    case USER_NOTIFICATIONS.MARK_AS_READ: {
      let { id } = action.payload;

      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: [...state.notifications.list.map((n) => {
            if (n._id === id) {
              return {
                ...n,
                isUnread: false,
              };
            }
            return n;
          })],
          unreadCount: state.notifications.unreadCount - 1,
        },
      };
    }
    case USER_NOTIFICATIONS.MARK_AS_UNREAD: {
      let { id } = action.payload;

      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: [...state.notifications.list.map((n) => {
            if (n._id === id) {
              return {
                ...n,
                isUnread: true,
              };
            }
            return n;
          })],
          unreadCount: state.notifications.unreadCount + 1,
        },
      };
    }
    case USER_NOTIFICATIONS.MARK_ALL_AS_READ: {
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: state.notifications.list.map((n) => ({ ...n, isUnread: false })),
          unreadCount: 0,
        },
      };
    }
    default:
      return state;
  }
};
export default userReducer;
