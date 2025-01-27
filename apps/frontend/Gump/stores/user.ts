export const emptyCurrentUser: CurrentUser = {
  id: 0,
  username: '',
  password: '',
  email: '',
  profilePicture: 0,
  recipes: [],
  likes: [],
  following: [],
  follower: [],
  badges: [],
  language: '',
  isModerator: false,
  token: '',
}

export const useUserStore = defineStore('user', {
  state: () => ({
    current: JSON.parse(JSON.stringify(emptyCurrentUser)) as CurrentUser,
    all: [] as User[],
  }),
  getters: {
    getUserNameById() {
      return (id: number) => {
        const foundUser = this.all?.find(user => user.id === id)
        return foundUser?.username || ''
      }
    },
    getUserIdByName() {
      return (name: string) => {
        const foundUser = this.all?.find(user => user.username === name)
        return foundUser?.id || 1
      }
    },
  },
  actions: {
    logout() {
      this.current = JSON.parse(JSON.stringify(emptyCurrentUser))
    },
    async register(userDto: UserDto) {
      const { data, error } = await gumpFetch('user/create', {
        headers: {},
        body: JSON.stringify(userDto),
      }).text().post()
      if (data.value)
        this.current.id = parseInt(data.value, 10)
      if (error.value)
        return error.value
    },
    async login(userDto: UserDto): Promise<{ token: string | undefined; error: unknown } | undefined> {
      const { data, error } = await gumpFetch<{ token: string; id: number }>('auth/login', {
        headers: {},
        method: 'POST',
        body: JSON.stringify(userDto),
      }).json()
      if (data.value) {
        this.current.token = data.value.token
        this.current.password = userDto.password
        return { token: data.value.token, error: undefined }
      }

      if (error.value)
        return { token: undefined, error: error.value }
    },
    async getUserData() {
      const { data, error } = await gumpFetch<CurrentUser>('user/me', {
        method: 'GET',
      }).json()
      if (data.value) {
        const { token, password } = this.current
        this.current = data.value
        this.current.password = password
        this.current.token = token
      }
      if (error.value)
        return error.value
    },
    async getAuthorById(id: number): Promise<string | undefined> {
      const { data, error } = await gumpFetch<User>(`user/${id}`, {
        headers: {},
        method: 'GET',
      }).json()
      if (data.value)
        return data.value.username
      if (error.value)
        return '¯⁠\\_(⁠ツ⁠)_/⁠¯'
    },
    async getUserById(id: number): Promise<User | undefined> {
      const { data, error } = await gumpFetch<User>(`user/${id}`, {
        headers: {},
        method: 'GET',
      }).json()
      if (data.value) {
        const index = this.all.findIndex(user => user.id === id)
        if (index !== -1)
          this.all[index] = data.value
        else
          this.all.push(data.value)

        return data.value
      }
      if (error.value)
        return error.value
    },
    async searchUser(search: string): Promise<SearchUser[] | undefined> {
      const { data, error } = await gumpFetch<SearchUser[]>(`user/search?searchTerm=${search}`, {
        headers: {},
        method: 'GET',
      }).json()
      if (data.value) {
        const promises = data.value.map(async (user: SearchUser) => await this.getUserById(user.id))

        await Promise.all(promises)

        return data.value
      }
      if (error.value)
        return error.value
    },
    async searchUserName(search: string): Promise<string[] | undefined> {
      const { data, error } = await gumpFetch<SearchUser[]>(`user/search?searchTerm=${search}`, {
        headers: {},
        method: 'GET',
      }).json()
      if (data.value) {
        const promises = data.value.map(async (user: SearchUser) => await this.getUserById(user.id))

        await Promise.all(promises)

        return data.value.map((user: SearchUser) => user.username)
      }
      if (error.value)
        return error.value
    },
    async updateUser(userDto: UserDto, profilePicture: number, language: string): Promise<User | undefined> {
      const requestBody = {
        ...userDto,
        id: this.current.id,
        profilePicture,
        language,
      }
      const { data, error } = await gumpFetch('user/update', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      }).json()
      if (data.value)
        return data.value
      if (error.value)
        return error.value
    },
    async getFollows(type: FollowsSort): Promise<User[] | undefined> {
      const users: User[] = []

      const { data, error } = await gumpFetch<CurrentUser>('user/me', {
        method: 'GET',
      }).json()
      if (data.value) {
        if (type === 'Followers') {
          for (const userId of data.value.follower) {
            const user = await this.getUserById(userId)
            if (user)
              users.push(user)
          }
          return users
        } else {
          for (const userId of data.value.following) {
            const user = await this.getUserById(userId)
            if (user)
              users.push(user)
          }
          return users
        }
      }
      if (error.value)
        return error.value
    },
    async followUser(id: number): Promise<boolean | undefined> {
      const { data, error } = await gumpFetch(`user/follow/${id}`, {
        method: 'PATCH',
      }).text()
      if (data.value) {
        if (String(data.value) === 'followed') {
          this.current.following.push(id)
          return true
        } else {
          this.current.following = this.current.following.filter(following => following !== id)
          return false
        }
      }

      if (error.value)
        return error.value
    },
  },
  persist: true,
})
