import { IEntity } from "relaen";
import { NfResource } from "./entity/nfresource";

export class NfFileService {
    /**
     * 上传文件
     * @param fn 
     * @param path 
     * @returns 
     */
    public async addFile(fn: string, path: string): Promise<{ fileName: string, url: string, fileId: number }> | null {
        let r = await this.saveFile(fn, path);
        if (r) {
            return {
                fileName: r.resourceName,
                url: r.filePath,
                fileId: r.resourceId
            }
        }
        return null;
    }

    /**
     * 根据文件id删除文件
     * @param fileId 
     * @returns 
     */
    public async deleteFile(fileId: number): Promise<boolean> {
        let file: NfResource = <NfResource>await NfResource.find(fileId);
        let r: IEntity = await file.delete();
        if (r) {
            return true;
        }
        return false;
    }

    /**
     * 新建一个文件
     * @param fn 
     * @param path 
     * @returns 
     */
    public async saveFile(fn: string, path: string): Promise<NfResource> | null {
        let file: NfResource = new NfResource();
        file.filePath = path;
        file.downPath = this.getDownPath(path);
        file.resourceName = fn;
        let r: NfResource = <NfResource>await file.save();
        if (r) {
            return r;
        }
        return null;
    }

    /**
     * 根据id查文件
     * @param fileId 
     * @returns 
     */
    public async findFileById(fileId: number): Promise<NfResource> {
        return <NfResource>await NfResource.find(fileId)
    }

    /**
     * 根据绝对路径返回下载路径
     * @param path 
     * @returns 
     */
    public getDownPath(path: string): string {
        path = path.substr(process.cwd().length);
        if (require('os').platform() === 'win32') {
            return path.replace(/\\+/g, '/');
        }
        return path.replace(/\/+/g, '/');

    }
}