import { Expose } from "class-transformer";
import { Collection } from "./Collection.js";
import { Entity, Column, OneToMany, Relation } from "typeorm";
import { ArchiveItem } from "./ArchiveItem.js";
import { EntityInfo } from "./EntityInfo.js";

@Entity({ name: 'authors' })
export class Author extends EntityInfo {
    @Expose()
    @Column({ type: 'varchar', nullable: false })
    description: string;

    @OneToMany(() => Collection, (collection) => collection.author)
    collections: Relation<Collection[]>

    @OneToMany(() => ArchiveItem, (archiveItem) => archiveItem.author)
    archiveItems: Relation<ArchiveItem[]>
}