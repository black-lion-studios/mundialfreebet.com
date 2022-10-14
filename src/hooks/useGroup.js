import { useState, useEffect } from 'react';
import { fetchGroup } from '../api/groups';

export const useGroup = group_key => {
  const [group, setGroup] = useState({})

  useEffect(() => {
    fetchGroup(group_key).then(data => setGroup(data))
  }, [group_key])

  return group
}
