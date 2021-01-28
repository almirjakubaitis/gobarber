import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    // console.log(key, value);

    this.cache[key] = JSON.stringify(value);
  }

  //  public async recover(key: string): Promise<any | null> {}
  public async recover<T>(key: string): Promise<T | null> {
    // const data = await this.client.get(JSON.parse(key));

    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key => key.startsWith(prefix));

    keys.forEach(key => {
      delete this.cache[key];
    });

    // await this.client.keys(`${prefix}:*`);

    // const pipeline = this.client.pipeline();

    // keys.forEach(key => {
    //   pipeline.del(key);
    // });

    // await pipeline.exec();
  }
}
