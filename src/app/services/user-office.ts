import { OfficeDoc, UserDoc, UserOfficeModel } from '../models'

interface UpdateUserOfficeData {
  user: UserDoc
  office: OfficeDoc
}

export async function update({ user, office }: UpdateUserOfficeData) {
  await UserOfficeModel.findOneAndUpdate(
    { user, office },
    { updatedAt: new Date() },
    { upsert: true }
  )
}
