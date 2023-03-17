import { Bytes } from '@graphprotocol/graph-ts';

// Event Imports [based on the yaml config]
import {
    MetadataUpdate as MetadataUpdateEvent,
    MetadataUpdate1 as MetadataUpdateEvent1,
    MetadataUpdate2 as MetadataUpdateEvent2,
    MetadataUpdate3 as MetadataUpdateEvent3,
    MetadataUpdate4 as MetadataUpdateEvent4,
} from '../generated/FleekNFA/FleekNFA';

// Entity Imports [based on the schema]
import {
    GitRepository as GitRepositoryEntity,
    MetadataUpdate,
    Token,
} from '../generated/schema';

export function handleMetadataUpdateWithStringValue(
    event: MetadataUpdateEvent1
): void {
    /**
     * Metadata handled here:
     * setTokenExternalURL
     * setTokenENS
     * setTokenName
     * setTokenDescription
     * setTokenLogo
     * */
    let entity = new MetadataUpdate(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );

    entity.tokenId = event.params._tokenId;
    entity.key = event.params.key;
    entity.stringValue = event.params.value;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    // UPDATE TOKEN
    let token = Token.load(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
    );

    if (token) {
        if (event.params.key == 'externalURL') {
            token.externalURL = event.params.value;
        } else if (event.params.key == 'ENS') {
            token.ENS = event.params.value;
        } else if (event.params.key == 'name') {
            token.name = event.params.value;
        } else if (event.params.key == 'description') {
            token.description = event.params.value;
        } else {
            // logo
            token.logo = event.params.value;
        }
        token.save();
    }
}

export function handleMetadataUpdateWithDoubleStringValue(
    event: MetadataUpdateEvent3
): void {
    /**
     * setTokenBuild
     */
    let entity = new MetadataUpdate(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );

    entity.key = event.params.key;
    entity.tokenId = event.params._tokenId;
    entity.doubleStringValue = event.params.value;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    // UPDATE TOKEN
    let token = Token.load(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
    );

    if (token) {
        if (event.params.key == 'build') {
            let gitRepositoryEntity = GitRepositoryEntity.load(event.params.value[1]);
            if (!gitRepositoryEntity) {
                // Create a new gitRepository entity
                gitRepositoryEntity = new GitRepositoryEntity(event.params.value[1]);
            }
            token.commitHash = event.params.value[0];
            token.gitRepository = event.params.value[1];
            token.save();
            gitRepositoryEntity.save();
        }
    }
}

export function handleMetadataUpdateWithIntValue(
    event: MetadataUpdateEvent2
): void {
    /**
     * setTokenColor
     */
    let entity = new MetadataUpdate(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );

    entity.key = event.params.key;
    entity.tokenId = event.params._tokenId;
    entity.uint24Value = event.params.value;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    let token = Token.load(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
    );

    if (token) {
        if (event.params.key == 'color') {
            token.color = event.params.value;
        }
        token.save();
    }
}

export function handleMetadataUpdateWithBooleanValue(
    event: MetadataUpdateEvent4
): void {
    /**
     * accessPointAutoApproval
     */
    let entity = new MetadataUpdate(
        event.transaction.hash.concatI32(event.logIndex.toI32())
    );

    entity.key = event.params.key;
    entity.tokenId = event.params._tokenId;
    entity.booleanValue = event.params.value;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;

    entity.save();

    let token = Token.load(
        Bytes.fromByteArray(Bytes.fromBigInt(event.params._tokenId))
    );

    if (token) {
        if (event.params.key == 'accessPointAutoApproval') {
            token.accessPointAutoApproval = event.params.value;
        }
        token.save();
    }
}