'use client';

import { Api } from "@/types/api";
import { Button } from "@heroui/react";
import CollectionsFilters from "./Filters";
import CollectionsTable from "./Table";

type Props = {
    collectionsRes: Api.AdminCollectionListResponse;
}

export default function Collections({collectionsRes}: Props) {
    return <section className="content-container">
        <div className="flex justify-between mb-7">
            <h2>Collections</h2>
            <Button color="primary">Create Collection</Button>
        </div>
        <CollectionsFilters />
        <CollectionsTable collectionsRes={collectionsRes}/>
    </section>
}