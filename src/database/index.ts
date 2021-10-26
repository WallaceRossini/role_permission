import { Connection, ConnectionOptions, createConnection } from 'typeorm';

export class MySQLConnector {

  private static mysql_connection: Connection;

  private host: string
  private port: number
  private username: string
  private password: string
  private database: string
  private entities: string

  constructor() {
    this.host = String(process.env.DATABASE_HOST)
    this.port = Number(process.env.DATABASE_PORT)
    this.username = String(process.env.DATABASE_USER)
    this.password = String(process.env.DATABASE_PASS)
    this.database = String(process.env.DATABASE_NAME)
    this.entities = `${__dirname}/../${process.env.DATABASE_ENTITIES}`
  }


  get connection(): Connection {
    return MySQLConnector.mysql_connection;
  }

  public async connect() {

    const opts: ConnectionOptions = {
      type: 'mysql',
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [
        this.entities
      ]
    };

    const connection = await createConnection(opts)

    MySQLConnector.mysql_connection = connection
  }

  public disconnect(): Promise<any> {
    return MySQLConnector.mysql_connection.close()
  }
}