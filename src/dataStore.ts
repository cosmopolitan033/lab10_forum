import fs from 'fs';
const rootDir = process.cwd();
const dataPath = `${rootDir}/src/store.json`;

/// /////////////////////////////////
/// ///////////setUser//////////////
/// ///////////////////////////////
export interface User {
    email?: string,
    password?: string,
    nameFirst?: string,
    nameLast?: string,
    name?: string,
    authUserId?: number,
    HistoryPassword?: string[],
    numFailedPasswordsSinceLastLogin?: number,
    numSuccessfulLogins?: number,
}

/// /////////////////////////////////
/// ///////////setQuiz//////////////
/// ///////////////////////////////
export interface Quiz {
    quizId?: number,
    ownerId?: number,
    name?: string,
    timeCreated?: number,
    timeLastEdited?: number,
    description?: string,
    numQuestions?: number,
    quizTrash?: boolean,
    questions?: Question[],
    duration?: number,
    thumbnailUrl?: string
}

export interface returnObj {
    quizId?: number,
    name?: string
}

/// /////////////////////////////////
/// /////////setSession/////////////
/// ///////////////////////////////
export enum State {
    LOBBY = 'lobby',
    QUESTION_COUNTDOWN = 'question_countdown',
    QUESTION_OPEN = 'question_open',
    QUESTION_CLOSE = 'question_close',
    ANSWER_SHOW = 'answer_show',
    FINAL_RESULTS = 'final_results',
    END = 'end'
}
// action, autoStartNum, session just has one
export enum Action {
    NEXT_QUESTION = 'next_question',
    SKIP_COUNTDOWN = 'skip_countdown',
    GO_TO_ANSWER = 'go_to_answer',
    GO_TO_FINAL_RESULTS = 'go_to_final_results',
    END = 'end'
}

export interface Session {
    sessionId?: number,
    authUserId?: number,
    token?: string,
}

export interface Player {
    playerId?: number,
    name?: string,
    score?: number,
}
export interface QuestionResponse {
    questionId: number;
    playerId?: number,
    playerName?: string,
    responseTime?: number,
    submitAnswerIds?: number[],
    points: number;
}

export interface QuizSession {
    quizSessionId?: number,
    quizId?: number,
    autoStartNum?: number,
    state?: State,
    atQuestion?: number,
    players?: Player[],
    metadata?: Quiz,
    questionOpen: number,
    messages: Message[]
}

export interface Message {
    messageBody?: string,
    playerId?: number,
    playerName: string,
    timeSent?: number
}
/// /////////////////////////////////
/// ////////setQuestion/////////////
/// ///////////////////////////////

export interface Answer {
    answerId?: number,
    answer?: string,
    correct?: boolean,
    color?: string,
}

export interface Question {
    questionId?: number,
    question?: string,
    duration?: number,
    points?: number,
    answers?: Answer[],
    thumbnailUrl?: string,
    averageAnswerTime?: number,
    percentCorrect?: number,
    response?: QuestionResponse[],
    playersCorrectList: string[],
}

export interface QuestionBody {
    question?: string,
    duration?: number,
    points?: number,
    answers?: Answer[],
    thumbnailUrl?: string,
    averageAnswerTime?: number,
    percentCorrect?: number,
}
/// /////////////////////////////////
/// ///////////MainData/////////////
/// ///////////////////////////////
export interface Data {
    users: User[],
    quizzes: Quiz[],
    sessions: Session[],
    authUserId_count: number,
    QuizId_count: number,
    questionId_count: number,
    sessionId_count: number,
    quizSession: QuizSession[],
    quizSessionId_count: number,
    playerId_count: number,
    answerId_count: number
}

let data: Data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

/// /////////////////////////////////
/// ///////////Function/////////////
/// ///////////////////////////////

export function getData() {
    return data;
}

export function setData(newData:Data) {
    data = newData;
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataPath, json, { flag: 'w' });
}
