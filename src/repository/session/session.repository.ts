import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SessionsModel, } from "src/schemas"

interface CreateNew {
  token: string;
  visitorId: string;
  userId: string;
};

@Injectable()
export class SessionRepository {
  constructor(@InjectModel(SessionsModel.name) private sessionsModel: Model<SessionsModel>) { }

  async expirePreviousSessions(userId: string) {
    await this.sessionsModel.updateMany({ userId }, { $set: { status: false } })
    return true
  }

  async createNewSession(sessionData: CreateNew) {
    const newSession = this.sessionsModel.create(sessionData)
    return newSession
  }

}