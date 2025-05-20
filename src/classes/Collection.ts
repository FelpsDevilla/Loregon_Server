import { Expose } from "class-transformer";
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, Relation } from "typeorm";
import { Author } from "./Author.js";
import { ArchiveItem } from "./ArchiveItem.js";
import { LibraryItem } from "./LibraryItem.js";
import { EntityInfo } from "./EntityInfo.js";

@Entity({ name: 'collections' })
export class Collection extends EntityInfo {
    @Expose()
    @ManyToOne(() => Author, (author) => author.collections, { nullable: false })
    @JoinColumn()
    author: Relation<Author>

    @OneToMany(() => ArchiveItem, (archiveItem) => archiveItem.collection)
    archiveItems: Relation<ArchiveItem[]>

    @OneToMany(() => LibraryItem, (libaryItem) => libaryItem.collection)
    libraryeItems: Relation<ArchiveItem[]>

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    description: string;
}